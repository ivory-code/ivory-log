export interface ProfileForm {
  mainTitle: string
  subTitle: string
  content: string
  imageUrl: string
}

export interface DialogConfig {
  isVisible: boolean
  isError: boolean
  message: string
}

export interface ProfileState {
  profileForm: ProfileForm
  dialogConfig: DialogConfig
  imageFile: File | null
}

type Action =
  | {type: 'SET_FORM'; field: keyof ProfileForm; value: string}
  | {type: 'SET_IMAGE_FILE'; file: File | null}
  | {type: 'SET_DIALOG'; dialog: Partial<DialogConfig>}
  | {type: 'RESET_DIALOG'}
  | {type: 'SET_PROFILE'; profile: ProfileForm}

export const initialProfileState: ProfileState = {
  profileForm: {
    mainTitle: '',
    subTitle: '',
    content: '',
    imageUrl: '',
  },
  dialogConfig: {
    isVisible: false,
    isError: false,
    message: '',
  },
  imageFile: null,
}

export const profileReducer = (
  state: ProfileState,
  action: Action,
): ProfileState => {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        profileForm: {
          ...state.profileForm,
          [action.field]: action.value,
        },
      }
    case 'SET_IMAGE_FILE':
      return {...state, imageFile: action.file}
    case 'SET_DIALOG':
      return {
        ...state,
        dialogConfig: {...state.dialogConfig, ...action.dialog},
      }
    case 'RESET_DIALOG':
      return {
        ...state,
        dialogConfig: initialProfileState.dialogConfig,
      }
    case 'SET_PROFILE':
      return {...state, profileForm: action.profile}
    default:
      return state
  }
}
