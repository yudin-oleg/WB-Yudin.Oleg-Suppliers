import "./ModalInput.css";
import PossibleInputs from "./PossibleInputs.tsx";
import React from "react";
import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { formatDate } from "./Modal.tsx";

export function ModalInput<T>({
	addNew,
	type,
	modalEditTitle,
	currentValue,
	onChange,
	possibleValues,
}: {
	addNew: boolean;
	type: string;
	modalEditTitle: string;
	currentValue: T;
	onChange: (value: T) => void;
	possibleValues: T[];
}) {
	// const values = possibleValues;
	// console.log(values);
	const [modalInputsActive, setModalInputsActive] = useState(false);
	const [calenderOpen, setCalenderOpen] = useState(false);
	let input;
	const handleDateChange = (value: Date) => {
		// console.log(value);
		onChange(value as T);
		setCalenderOpen(false);
	};
	if (
		type === "town" ||
		type === "supplyType" ||
		type === "storeHouse" ||
		type === "status"
	) {
		input = (
			<div
				className="modal-edit-list"
				onClick={() => setModalInputsActive(true)}
			>
				<p>{currentValue as string}</p>
				<div className="modal-edit-list-container">
					<img src="../img/icon-arrow-down.svg" alt="icon-arrow-down" />
				</div>
			</div>
		);
	} else if (type === "quantity") {
		input = (
			<div className="modal-edit-list">
				<input
					className="quantity-input"
					type="text"
					value={currentValue as string}
					onChange={(e) => onChange((e.target as HTMLInputElement).value as T)}
				/>
				<div className="quantity">шт.</div>
			</div>
		);
	} else if (type === "date") {
		input = (
			<div className="modal-edit-list" onClick={() => setCalenderOpen(true)}>
				<p>{formatDate(currentValue as Date)}</p>
				<div className="modal-edit-list-container">
					<img
						className="calendar"
						src="../img/icon-calendar.svg"
						alt="icon-calendar"
					/>
				</div>
				{calenderOpen && (
					<div className="modal-edit-list-pop-up">
						<Calendar date={currentValue as Date} onChange={handleDateChange} />
					</div>
				)}
			</div>
		);
	}
	return (
		<React.Fragment>
			<div
				className={
					addNew === true ? "modal-edit-item addNew" : "modal-edit-item"
				}
			>
				<div className="modal-edit-title">{modalEditTitle}</div>
				{input}
			</div>
			<PossibleInputs
				possibleInputsTitle={modalEditTitle}
				currentValue={currentValue}
				onChange={onChange}
				inputs={possibleValues}
				active={modalInputsActive}
				setActive={setModalInputsActive}
			/>
		</React.Fragment>
	);
}
