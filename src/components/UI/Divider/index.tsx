import { FC } from "react"

interface DividerProps {
    margin: string
    color?: string
    height?: string
}

export const Divider: FC<DividerProps> = ({
    color='#e8e8e8',
    height='0.5px',
    margin
}) => {

    return (
        <div style={{
            width: '100%',
            backgroundColor: color,
            height: height,
            margin: margin
        }}>
        </div>
    )
}