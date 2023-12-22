import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  border: boolean;
  children: ReactNode;
}

const Card = ({ border, children, ...props } : Props) => {
  
  return (
    <div className={`${border && 'rounded border-slate-2000 border'} p-10`}>
      {children}
    </div>
  )
}

export default Card