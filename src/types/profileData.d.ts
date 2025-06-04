export interface ProfileEditableDate {
  name: string
  phone: string
}

export interface ProfileData extends ProfileEditableDate {
  email: string
}

export interface CreateProfileData {
  name: string
  email: string
  phone: string
  password: string
  message?: string | null
}
