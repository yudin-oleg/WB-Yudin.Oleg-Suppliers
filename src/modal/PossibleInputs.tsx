import "./PossibleInputs.css";
import { nanoid } from "@reduxjs/toolkit";
// import {useState} from "react"

export default function PossibleInputs<T>({
	possibleInputsTitle,
	currentValue,
	onChange,
	inputs,
	active,
	setActive,
}: {
	possibleInputsTitle: string;
	currentValue: T;
	onChange: (input: T) => void;
	inputs: T[];
	active: boolean;
	setActive: (value: boolean) => void;
}) {
	function chooseValueCloseWindow(input: T) {
		onChange(input);
		setActive(false);
	}

	return (
		<div className={active ? "possible-inputs active" : "possible-inputs"}>
			<div className="possible-inputs-container">
				<div className="possible-inputs-title-closing">
					<div className="possible-inputs-title">{possibleInputsTitle}</div>
					<div className="possible-inputs-closing">
						<img
							src="../img/icon-closing.svg"
							alt="icon-closing"
							onClick={() => setActive(false)}
						/>
					</div>
				</div>
				<div className="frame">
					{inputs.map((input) => (
						<div
							className="possible-inputs-item"
							key={nanoid()}
							onClick={() => chooseValueCloseWindow(input)}
						>
							<div className="possible-inputs-value">{input as string}</div>
							{currentValue === input && (
								<div className="check-container">
									<img src="../img/icon-check.svg" alt="icon-check" />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
