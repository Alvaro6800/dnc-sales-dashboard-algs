export type InputProps = React.InputHTMLAttributes<HTMLInputElement>
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export type LinkProps = React.LinkHTMLAttributes<HTMLLinkElement>

export type MessageProps = {
  msg: string
  type: 'error' | 'success'
}

export interface FormComponentProps {
  inputs: InputProps[]
  buttons: ButtonProps[]
  message?: MessageProps
  linkPath?: string
  linkText?: string
}
