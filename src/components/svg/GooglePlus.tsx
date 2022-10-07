import { FC } from "react"
import { SVGProps } from "../../types/SVGProps"


export const GooglePlus: FC<SVGProps> = ({ width = 16, height = 16, fill = '#222' }) => {
	return (
		<svg width={width} height={height} fill={fill} viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
			<path d='M5.23828 1.92422C5.51484 2.14922 6.09141 2.62031 6.09141 3.51797C6.09141 4.39219 5.5875 4.80469 5.08125 5.19375C4.92422 5.34844 4.74375 5.5125 4.74375 5.77266C4.74375 6.03281 4.92422 6.17578 5.05547 6.28125L5.48906 6.61172C6.01875 7.04766 6.49922 7.45078 6.49922 8.26641C6.49922 9.37734 5.40469 10.4977 3.33516 10.4977C1.59141 10.5 0.75 9.68438 0.75 8.81016C0.75 8.38594 0.965625 7.78359 1.67578 7.36875C2.42109 6.92109 3.43359 6.86016 3.97266 6.825C3.80391 6.61172 3.61172 6.38672 3.61172 6.02109C3.61172 5.81953 3.67266 5.70234 3.73125 5.55938C3.6 5.57109 3.46641 5.58281 3.34688 5.58281C2.07188 5.58281 1.35 4.65 1.35 3.72891C1.35 3.18516 1.60312 2.58281 2.12109 2.14688C2.80781 1.59375 3.62578 1.5 4.275 1.5H6.75234L5.98359 1.92422H5.23828ZM4.38281 7.16953C4.28672 7.15781 4.22578 7.15781 4.10625 7.15781C3.99844 7.15781 3.34922 7.18125 2.84297 7.34531C2.57813 7.43906 1.80937 7.72266 1.80937 8.56172C1.80937 9.40078 2.63906 10.0031 3.92578 10.0031C5.08125 10.0031 5.69297 9.45938 5.69297 8.72813C5.69297 8.12578 5.29688 7.80703 4.38281 7.16953ZM4.73203 4.92422C5.00859 4.65234 5.03203 4.275 5.03203 4.06172C5.03203 3.21094 4.51406 1.88906 3.51562 1.88906C3.20391 1.88906 2.86641 2.04141 2.67422 2.27812C2.47031 2.52656 2.40938 2.84531 2.40938 3.15234C2.40938 3.94453 2.87812 5.25469 3.91406 5.25469C4.21406 5.25703 4.5375 5.11406 4.73203 4.92422Z' />
			<path d='M11.2498 3.33513H9.41465V1.50232H8.99981V3.33513H7.13184V3.75232H8.99981V5.64841H9.41465V3.75232H11.2498V3.33513Z' />
		</svg>
	)
}
