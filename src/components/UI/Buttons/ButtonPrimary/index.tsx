import React, { FC, useState } from 'react'
import s from './ButtonPrimary.module.css'

interface DefStyles {
    color?: string
    backgroundColor?: string
    backgroundColorHover?: string
    fontSize?: string
    margin?: string
    padding?: string
    borderRadius?: string
}

interface ButtonPrimaryProps extends DefStyles{
    text: string
    onClick?: any
    disabled?: boolean
    className?: any
}

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
    text, 
    color, 
    backgroundColor,
    backgroundColorHover,
    fontSize,
    margin,
    padding,
    borderRadius,
    onClick,
    disabled = false,
    className
}) => {

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    //default styles
    const def: DefStyles = {
        color: "var(--color-light)",
        backgroundColor: "var(--color-primary)",
        backgroundColorHover: "var(--color-black)",
        fontSize: "17px",
        margin: "0",
        padding: "15px 30px",
        borderRadius: "10px"
    }

    const styleParams: object = {
        color: color ?? def.color,

        //Changes background color on Hover
        backgroundColor: isHover ? 
            backgroundColorHover ?? def.backgroundColorHover : 
            backgroundColor ?? def.backgroundColor,

        fontSize: fontSize ?? def.fontSize,
        margin: margin ?? def.margin,
        padding: padding ?? def.padding,
        borderRadius: borderRadius ?? def.borderRadius,
        textTransform: 'uppercase',
        transition: '.3s',
        lineHeight: fontSize ?? def.fontSize
    }

    

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={styleParams}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {text}
        </button>
    )
}
