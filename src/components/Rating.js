import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ value }) => {
	const ratingStar = Array.from({ length: 5 }, (elem,index) => {
		let number = index + 0.5;
		return (
				<span key={index}>
				{value >= index + 1 ? (
					<FaStar className="text-amber-400" />
				) : value >= number ? (
					<FaStarHalfAlt className="text-amber-400" />
				) : (
					<AiOutlineStar className="text-slate-400"/>
				)}
			</span>
		)
	})

	return (
		<div className="flex">
			{ratingStar}
		</div>
	)
}

export default Rating;