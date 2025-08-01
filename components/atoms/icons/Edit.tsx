import EditIconC from "./EditIcon"
type EditProps_TP = {
  className?: string
  action?: () => void
  size?:number
}
export const Edit = ({
  className,
  action,
  ...props
}: EditProps_TP) => {

  return (
    <EditIconC
      className={`cursor-pointer  ${className}`}
      onClick={action}
      {...props}
    />
  )
}
