import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarHelperService } from '@services/toolbar-helper/toolbar-helper.service';
import { profileTabLinks } from '@modules/main/client/profile/profile-tab-links';
import { AbstractFormComponent, FormControlRecord } from '@misc/abstracts/components/abstract-form.component';
import { User } from '@models/classes/user/user.model';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { IOption } from '@models/interfaces/forms/option.interface';
import { WorkExperience } from '@models/classes/work-experience.model';
import { Accomplishment } from '@models/classes/accomplishment.model';
import { Education } from '@models/classes/education.model';
import { Certification } from '@models/classes/certification.model';
import { Skill } from '@models/classes/skill.model';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { plainToInstance } from 'class-transformer';
import { IndustryApiService } from '@services/api/industry-api/industry-api.service';
import { WorkExperienceApiService } from '@services/api/work-experience-api/work-experience-api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { AccomplishmentApiService } from '@services/api/accomplishment-api/accomplishment-api.service';
import { EducationApiService } from '@services/api/education-api/education-api.service';
import { CertificationApiService } from '@services/api/certification-api/certification-api.service';
import { SkillsApiService } from '@services/api/skills-api/skills-api.service';
import { SkillLevelApiService } from '@services/api/skill-level-api/skill-level-api.service';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { AbstractModel } from '@models/classes/_base.model';
import { ApiFile } from '@models/classes/file.model';

type UserListingFields = Pick<User, 'work_experiences' | 'accomplishments' | 'educations' | 'certifications' | 'skills'>;
type UserListingModels = WorkExperience & Accomplishment & Education & Certification & Skill;

interface IFormSection {
  title: string;
  listName: keyof UserListingFields;
  addBtnName: string;
  fieldsTemplate: TemplateRef<any>;
}

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent extends AbstractFormComponent<Partial<User>> implements AfterViewInit, OnInit {
  @ViewChild('workTemplate') workTemplate: TemplateRef<unknown>;
  @ViewChild('accomplishmentsTemplate') accomplishmentsTemplate: TemplateRef<unknown>;
  @ViewChild('educationTemplate') educationTemplate: TemplateRef<unknown>;
  @ViewChild('certificationsTemplate') certificationsTemplate: TemplateRef<unknown>;
  @ViewChild('skillsTemplate') skillsTemplate: TemplateRef<unknown>;
  industryOptions: IOption[] = [];
  skillLevelOptions: IOption[] = [];
  formSections: IFormSection[] = [];
  private _toolbar: ToolbarHelperService = inject(ToolbarHelperService);
  private _auth: AuthService = inject(AuthService);
  private _userApi: UserApiService = inject(UserApiService);
  private _industryApi: IndustryApiService = inject(IndustryApiService);
  private _workExperienceApi: WorkExperienceApiService = inject(WorkExperienceApiService);
  private _accomplishmentApi: AccomplishmentApiService = inject(AccomplishmentApiService);
  private _educationApi: EducationApiService = inject(EducationApiService);
  private _certificationApi: CertificationApiService = inject(CertificationApiService);
  private _skillApi: SkillsApiService = inject(SkillsApiService);
  private _skillLevelApi: SkillLevelApiService = inject(SkillLevelApiService);
  private _formArrayCreatorsMap: Map<keyof UserListingFields, (item: UserListingModels) => FormGroup> = new Map<
    keyof UserListingFields,
    (item: UserListingModels) => FormGroup
  >([
    ['work_experiences', this._getWorkExperienceGroup],
    ['accomplishments', this._getAccomplishmentsGroup],
    ['educations', this._getEducationGroup],
    ['certifications', this._getCertificationsGroup],
    ['skills', this._getSkillsGroup]
  ]);
  private _listingFieldApiMap: Map<keyof UserListingFields, AbstractApiService<AbstractModel>> = new Map<
    keyof UserListingFields,
    AbstractApiService<AbstractModel>
  >([
    ['work_experiences', this._workExperienceApi],
    ['accomplishments', this._accomplishmentApi],
    ['educations', this._educationApi],
    ['certifications', this._certificationApi],
    ['skills', this._skillApi]
  ]);

  override ngOnInit(): void {
    super.ngOnInit();
    this._getSelectOptionsEntities();
  }

  ngAfterViewInit(): void {
    this._toolbar.data = {
      pageName: 'My profile',
      navLinks: profileTabLinks
    };
    this._setFormSections();
    this._cdr.detectChanges();
  }

  getArrayControls(arrayName: keyof UserListingFields): FormGroup<FormControlRecord<UserListingModels>>[] {
    return this.getArray(arrayName).controls as FormGroup[];
  }

  addRow(arrayName: keyof UserListingFields): void {
    this.getArray(arrayName).push(this._getGroupByName(arrayName, {} as UserListingModels));
  }

  deleteRow(arrayName: keyof UserListingFields, idx: number): void {
    const id: string = this.getArray(arrayName).at(idx).value.id;

    this._deleteItem(this._listingFieldApiMap.get(arrayName), id, arrayName, idx);
  }

  asArrayItemControls(group: FormGroup): FormControlRecord<UserListingModels> {
    return group.controls;
  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const { id, first_name, last_name, phone_number, industry }: User = this.formGroup.value;
    const userData: Partial<User> = {
      id,
      first_name,
      last_name,
      phone_number
    };

    if (this.formGroup.dirty) {
      forkJoin([
        this._userApi.updateItem(userData),
        this.form.industry.dirty ? this._industryApi.createItem({ industry }) : of(null),
        ...this._getWorkExperienceRequests(),
        ...this._getAccomplishmentRequests(),
        ...this._getEducationRequests(),
        ...this._getCertificationRequests(),
        ...this._getSkillRequests()
      ]).subscribe((): void => this._refreshProfile(true));
    }
  }

  protected override _initForm(): void {
    const me: User = this._auth.me;

    this.formGroup = this._fb.group<FormControlRecord<User, unknown>>({
      id: [me.id],
      photo: [me.photo?.full_size ? plainToInstance(ApiFile, { photo: me.photo?.full_size || '' }) : null],
      first_name: [me.first_name ?? '', [Validators.required]],
      last_name: [me.last_name ?? '', [Validators.required]],
      email: [me.email ?? '', [Validators.required]],
      phone_number: [me.phone_number ?? ''],
      industry: [me.industry?.id ?? ''],
      work_experiences: this._getFormArray(me, 'work_experiences'),
      accomplishments: this._getFormArray(me, 'accomplishments'),
      educations: this._getFormArray(me, 'educations'),
      certifications: this._getFormArray(me, 'certifications'),
      skills: this._getFormArray(me, 'skills')
    });
  }

  private _getSelectOptionsEntities(): void {
    this._industryApi.getItems().subscribe(res => {
      this.industryOptions = res.entities.map(item => ({ label: item.name, value: item.id }));
    });
    this._skillLevelApi.getItems().subscribe(res => {
      this.skillLevelOptions = res.entities.map(item => ({ label: item.name, value: item.id }));
    });
  }

  private _deleteItem(apiService: AbstractApiService<AbstractModel>, id: string, arrayName: keyof UserListingFields, idx: number): void {
    if (id) {
      apiService.deleteItem(id).subscribe((): void => {
        this.getArray(arrayName).removeAt(idx);
        this._refreshProfile();
      });
    } else {
      this.getArray(arrayName).removeAt(idx);
    }
  }

  private _getWorkExperienceRequests(): Observable<WorkExperience>[] {
    return this.getArrayControls('work_experiences')
      .filter(item => item.dirty && item.valid)
      .map(item => {
        return item.value.id
          ? this._workExperienceApi.updateItem(plainToInstance(WorkExperience, item.value))
          : this._workExperienceApi.createItem(plainToInstance(WorkExperience, item.value));
      });
  }

  private _getAccomplishmentRequests(): Observable<Accomplishment>[] {
    return this.getArrayControls('accomplishments')
      .filter(item => item.dirty && item.valid)
      .map(item => {
        return item.value.id
          ? this._accomplishmentApi.updateItem(plainToInstance(Accomplishment, item.value))
          : this._accomplishmentApi.createItem(plainToInstance(Accomplishment, item.value));
      });
  }

  private _getEducationRequests(): Observable<Education>[] {
    return this.getArrayControls('educations')
      .filter(item => item.dirty && item.valid)
      .map(item => {
        return item.value.id
          ? this._educationApi.updateItem(plainToInstance(Education, item.value))
          : this._educationApi.createItem(plainToInstance(Education, item.value));
      });
  }

  private _getCertificationRequests(): Observable<Certification>[] {
    return this.getArrayControls('certifications')
      .filter(item => item.dirty && item.valid)
      .map(item => {
        return item.value.id
          ? this._certificationApi.updateItem(plainToInstance(Certification, item.value))
          : this._certificationApi.createItem(plainToInstance(Certification, item.value));
      });
  }

  private _getSkillRequests(): Observable<Skill>[] {
    return this.getArrayControls('skills')
      .filter(item => item.dirty && item.valid)
      .map(item => {
        return item.value.id
          ? this._skillApi.updateItem(plainToInstance(Skill, item.value))
          : this._skillApi.createItem(plainToInstance(Skill, item.value));
      });
  }

  private _setFormSections(): void {
    this.formSections = [
      {
        title: 'Work experience',
        listName: 'work_experiences',
        addBtnName: 'Add another work experience',
        fieldsTemplate: this.workTemplate
      },
      {
        title: 'Professional accomplishments',
        listName: 'accomplishments',
        addBtnName: 'Add another accomplishments',
        fieldsTemplate: this.accomplishmentsTemplate
      },
      {
        title: 'Education',
        listName: 'educations',
        addBtnName: 'Add another education',
        fieldsTemplate: this.educationTemplate
      },
      {
        title: 'Certifications',
        listName: 'certifications',
        addBtnName: 'Add another certification',
        fieldsTemplate: this.certificationsTemplate
      },
      {
        title: 'Skills',
        listName: 'skills',
        addBtnName: 'Add another skill',
        fieldsTemplate: this.skillsTemplate
      }
    ];
  }

  private _getWorkExperienceGroup(item: WorkExperience): FormGroup {
    return this._fb.group<FormControlRecord<WorkExperience, unknown[]>>({
      id: [item.id ?? ''],
      job_title: [item.job_title ?? '', [Validators.required]],
      employer: [item.employer ?? '', [Validators.required]],
      start_date: [item.start_date ?? '', [Validators.required]],
      end_date: [item.end_date ?? '', [Validators.required]],
      description: [item.description ?? '']
    });
  }

  private _getAccomplishmentsGroup(item: Accomplishment): FormGroup {
    return this._fb.group<FormControlRecord<Accomplishment, unknown[]>>({
      id: [item.id ?? ''],
      description: [item.description ?? '', [Validators.required]]
    });
  }

  private _getEducationGroup(item: Education): FormGroup {
    return this._fb.group<FormControlRecord<Education, unknown[]>>({
      id: [item.id ?? ''],
      degree: [item.degree ?? '', [Validators.required]],
      institution_name: [item.institution_name ?? '', [Validators.required]],
      start_date: [item.start_date ?? '', [Validators.required]],
      end_date: [item.end_date ?? '', [Validators.required]],
      description: [item.description ?? '']
    });
  }

  private _getCertificationsGroup(item: Certification): FormGroup {
    return this._fb.group<FormControlRecord<Certification, unknown[]>>({
      id: [item.id ?? ''],
      name: [item.name ?? '', [Validators.required]],
      date: [item.date ?? '', [Validators.required]]
    });
  }

  private _getSkillsGroup(item: Skill): FormGroup {
    return this._fb.group<FormControlRecord<Skill, unknown[]>>({
      id: [item.id ?? ''],
      name: [item.name ?? '', [Validators.required]],
      level: [item.level ?? '', [Validators.required]]
    });
  }

  private _getGroupByName(name: keyof UserListingFields, entity: UserListingModels): FormGroup {
    return this._formArrayCreatorsMap.get(name).call(this, entity);
  }

  private _getFormArray(user: User, field: keyof UserListingFields): FormArray {
    const array: UserListingModels[] = (user[field]?.length ? user[field] : [{}]) as UserListingModels[];
    return new FormArray(array.map((entity: UserListingModels): FormGroup => this._getGroupByName(field, entity)));
  }

  private _refreshProfile(isInitForm?: boolean): void {
    this._auth.getMe().subscribe(() => isInitForm && this._initForm());
  }
}
