import toast from "react-hot-toast";
import Warning from "@material-ui/icons/Warning";

export default function Notification(
	textNotification: string,
	type: "success" | "warning" | "error" = "success",
) {
	return (
		<>
			{type === "warning"
				? toast(textNotification, {
					duration: 2500,
					icon: <Warning style={{ color: "#ffc000" }} />,
					style: {
						color: "#ffc000",
						border: "1px solid #ffc000",
						fontFamily: "Lato",
					},
				})
				: toast[type](textNotification, {
					duration: 2500,
					style: {
						border: `1px solid ${type === "success" ? "#4caf50" : "#bd0e0e"}`,
						fontFamily: "Lato",
					},
				})}
		</>
	);
}
