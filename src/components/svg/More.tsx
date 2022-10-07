import { FC } from "react"
import { SVGProps } from "../../types/SVGProps"


export const More: FC<SVGProps> = ({ width = 15, height = 15, fill = 'none' }) => {
	return (
		<svg width={width} height={height} fill={fill} viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M7.5 0.106689C3.36454 0.106689 0 3.43723 0 7.53088C0 11.6245 3.36454 14.9551 7.5 14.9551C11.6355 14.9551 15 11.6245 15 7.53088C15 3.43723 11.6355 0.106689 7.5 0.106689ZM10.196 7.86283L6.06923 10.3307C6.01008 10.3657 5.94256 10.3846 5.87361 10.3853C5.80466 10.3861 5.73675 10.3686 5.67686 10.3348C5.61696 10.301 5.56724 10.252 5.53278 10.1929C5.49832 10.1337 5.48037 10.0666 5.48077 9.99836V5.06341C5.48037 4.99515 5.49832 4.92802 5.53278 4.86889C5.56724 4.80977 5.61696 4.76078 5.67686 4.72696C5.73675 4.69314 5.80466 4.6757 5.87361 4.67642C5.94256 4.67715 6.01008 4.69603 6.06923 4.73111L10.196 7.19894C10.2536 7.23363 10.3011 7.28238 10.3341 7.34052C10.3671 7.39865 10.3844 7.46421 10.3844 7.53088C10.3844 7.59756 10.3671 7.66312 10.3341 7.72125C10.3011 7.77939 10.2536 7.82814 10.196 7.86283Z'
				fill='#40A944'
			/>
		</svg>
	)
}