import { AfterViewInit, ChangeDetectorRef, Component, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { Skill, SkillLevel } from '@models/classes/skill.model';

type UserListingFields = Pick<User, 'workExperience' | 'accomplishments' | 'education' | 'certifications' | 'skills'>;
type UserListingModels = WorkExperience & Accomplishment & Education & Certification & Skill;
type UserListingModelsUnion = WorkExperience | Accomplishment | Education | Certification | Skill;

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
export class ProfileFormComponent extends AbstractFormComponent<Partial<User>> implements AfterViewInit {
  @ViewChild('workTemplate') workTemplate: TemplateRef<any>;
  @ViewChild('accomplishmentsTemplate') accomplishmentsTemplate: TemplateRef<any>;
  @ViewChild('educationTemplate') educationTemplate: TemplateRef<any>;
  @ViewChild('certificationsTemplate') certificationsTemplate: TemplateRef<any>;
  @ViewChild('skillsTemplate') skillsTemplate: TemplateRef<any>;
  industryOptions: IOption[] = [
    { label: 'Education', value: 'education' },
    { label: 'IT', value: 'it' }
  ];
  skillLevelOptions: IOption[] = Object.entries(SkillLevel).map(([label, value]) => ({ label, value }));
  formSections: IFormSection[] = [];
  private _toolbar: ToolbarHelperService = inject(ToolbarHelperService);
  private _auth: AuthService = inject(AuthService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formArrayCreatorsMap: Map<keyof UserListingFields, (item: UserListingModels) => FormGroup> = new Map<
    keyof UserListingFields,
    (item: UserListingModels) => FormGroup
  >([
    ['workExperience', this._getWorkExperienceGroup],
    ['accomplishments', this._getAccomplishmentsGroup],
    ['education', this._getEducationGroup],
    ['certifications', this._getCertificationsGroup],
    ['skills', this._getSkillsGroup]
  ]);

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
    this.getArray(arrayName).removeAt(idx);
  }

  asArrayItemControls(group: FormGroup): FormControlRecord<UserListingModels> {
    return group.controls;
  }

  protected override _initForm(): void {
    const me: User = this._auth.me;

    this.formGroup = this._fb.group<FormControlRecord<User, unknown>>({
      avatar: [me.avatar ?? ''],
      firstName: [me.firstName ?? '', [Validators.required]],
      lastName: [me.lastName ?? '', [Validators.required]],
      email: [me.email ?? '', [Validators.required]],
      phone: [me.phone ?? '', [Validators.required]],
      industry: [me.industry ?? []],
      workExperience: this._getFormArray(me, 'workExperience'),
      accomplishments: this._getFormArray(me, 'accomplishments'),
      education: this._getFormArray(me, 'education'),
      certifications: this._getFormArray(me, 'certifications'),
      skills: this._getFormArray(me, 'skills')
    });
  }

  private _setFormSections(): void {
    this.formSections = [
      {
        title: 'Work experience',
        listName: 'workExperience',
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
        listName: 'education',
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
      jobTitle: [item.jobTitle ?? ''],
      employer: [item.employer ?? ''],
      startDate: [item.startDate ?? ''],
      endDate: [item.endDate ?? ''],
      description: [item.description ?? '']
    });
  }

  private _getAccomplishmentsGroup(item: Accomplishment): FormGroup {
    return this._fb.group<FormControlRecord<Accomplishment, unknown[]>>({
      id: [item.id ?? ''],
      accomplishments: [item.accomplishments ?? '']
    });
  }

  private _getEducationGroup(item: Education): FormGroup {
    return this._fb.group<FormControlRecord<Education, unknown[]>>({
      id: [item.id ?? ''],
      degree: [item.degree ?? ''],
      school: [item.school ?? ''],
      startDate: [item.startDate ?? ''],
      endDate: [item.endDate ?? ''],
      description: [item.description ?? '']
    });
  }

  private _getCertificationsGroup(item: Certification): FormGroup {
    return this._fb.group<FormControlRecord<Certification, unknown[]>>({
      id: [item.id ?? ''],
      certification: [item.certification ?? ''],
      date: [item.date ?? '']
    });
  }

  private _getSkillsGroup(item: Skill): FormGroup {
    return this._fb.group<FormControlRecord<Skill, unknown[]>>({
      id: [item.id ?? ''],
      name: [item.name ?? ''],
      level: [item.level ?? '']
    });
  }

  private _getGroupByName(name: keyof UserListingFields, entity: UserListingModels): FormGroup {
    return this._formArrayCreatorsMap.get(name).call(this, entity);
  }

  private _getFormArray(user: User, field: keyof UserListingFields): FormArray {
    const array: UserListingModels[] = (user[field]?.length ? user[field] : [{}]) as UserListingModels[];
    return new FormArray(array.map((entity: UserListingModels): FormGroup => this._getGroupByName(field, entity)));
  }
}
