import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Modal.css";
import "./ModalInput";
import { ModalInput } from "./ModalInput";
import { suppliesApi } from "../suppliesAPI";
import { nanoid } from "@reduxjs/toolkit";
// import { useGetSuppliesQuery } from "../suppliesAPI";
import { Supply } from "../SuppliesList";
import { addresses } from "../addresses";

export function Modal({
	popUpTitle,
	supply,
	onClose,
}: {
	popUpTitle: string;
	supply?: Supply;
	onClose: () => void;
}) {
	const id = supply?.id ?? randomIntFromInterval(100000, 999999);

	return (
		<div className="pop-up active">
			<div className="pop-up-container">
				<div className="title-closing">
					<div className="pop-up-title">{popUpTitle}</div>
					<div className="pop-up-closing">
						<img
							src="../img/icon-closing.svg"
							alt="icon-closing"
							onClick={() => onClose()}
						/>
					</div>
				</div>
				<div className="supply-id">
					<p>#{id}</p>
				</div>
				<div className="modal-edit-container">
					{popUpTitle === "Редактирование" && supply ? (
						<EditForm supply={supply} onClose={onClose} />
					) : (
						<CreateForm id={id} onClose={onClose} />
					)}
				</div>
			</div>
		</div>
	);
}

function EditForm({
	supply,
	onClose,
}: {
	supply: Supply;
	onClose: () => void;
}) {
	const dispatch = useDispatch();

	const [town, setTown] = useState<string>(supply?.town);
	const [supplyType, setSupplyType] = useState<string>(supply?.supplyType);
	const [quantity, setQuantity] = useState<string>(supply?.quantity);
	const [storeHouse, setStoreHouse] = useState<string>(supply?.storeHouse);
	const [status, setStatus] = useState<"В пути" | "Задерживается">(
		supply?.status
	);
	const [date] = useState<string>(supply?.date);

	const handleUpdateItem = (newData: Omit<Supply, "id">) => {
		dispatch(
			//@ts-ignore
			suppliesApi.util.updateQueryData("getSupplies", undefined, (supplies) => {
				const item = supplies.find((item) => item.id === supply.id);
				if (item) {
					Object.assign(item, newData);
				}
			})
		);

		onClose();
	};

	return (
		<div>
			<ModalInput
				addNew={false}
				type={"town"}
				modalEditTitle={"Город"}
				currentValue={town}
				onChange={setTown}
				possibleValues={[
					"Москва",
					"Псков",
					"Тверь",
					"абакан",
					"Нижний Новгород",
					"Кострома",
					"Ярославль",
				]}
			/>
			<ModalInput
				addNew={false}
				type={"supplyType"}
				modalEditTitle={"Тип поставки"}
				currentValue={supplyType}
				onChange={setSupplyType}
				possibleValues={["Короб", "Монопаллета"]}
			/>
			<ModalInput
				addNew={false}
				type={"quantity"}
				modalEditTitle={"Количество"}
				currentValue={quantity}
				onChange={setQuantity}
				possibleValues={[]}
			/>
			<ModalInput
				addNew={false}
				type={"storeHouse"}
				modalEditTitle={"Склад"}
				currentValue={storeHouse}
				onChange={setStoreHouse}
				possibleValues={[
					"Склад",
					"СЦ Абакан",
					"Черная грязь",
					"Внуково",
					"Белая дача",
					"Электросталь",
					"Вёшки",
				]}
			/>
			<ModalInput
				addNew={false}
				type={"status"}
				modalEditTitle={"Статус"}
				currentValue={status}
				onChange={setStatus}
				possibleValues={["В пути", "Задерживается"]}
			/>
			<div className="buttons-container">
				<button
					type="button"
					className="modal-button"
					onClick={() =>
						handleUpdateItem({
							town,
							supplyType,
							quantity,
							storeHouse,
							storeHouseAddress: addresses[storeHouse] as string,
							status,
							date,
						})
					}
				>
					Сохранить
				</button>
				<button
					type="button"
					className="modal-button-reset"
					onClick={() => onClose()}
				>
					Отменить
				</button>
			</div>
		</div>
	);
}

function CreateForm({ id, onClose }: { id: string; onClose: () => void }) {
	const dispatch = useDispatch();
	const { data } = suppliesApi.useGetSuppliesQuery(undefined);

	const [town, setTown] = useState<string>("");
	const [supplyType, setSupplyType] = useState<string>("");
	const [quantity, setQuantity] = useState<string>("");
	const [storeHouse, setStoreHouse] = useState<string>("");
	const [status, setStatus] = useState<"В пути" | "Задерживается">("В пути");
	const [date, setDate] = useState<Date | string>(new Date());

	const handleUpsertItem = (newData: Supply) => {
		console.log(newData);
		dispatch(
			//@ts-ignore
			suppliesApi.util.upsertQueryData("getSupplies", undefined, [
				...(data ?? []),
				newData,
			])
		);
		onClose();
	};

	return (
		<div>
			<ModalInput
				addNew={true}
				type={"date"}
				modalEditTitle={"Дата поставки"}
				currentValue={date}
				onChange={setDate}
				possibleValues={[]}
			/>
			<ModalInput
				addNew={true}
				type={"town"}
				modalEditTitle={"Город"}
				currentValue={town}
				onChange={setTown}
				possibleValues={[
					"Москва",
					"Псков",
					"Тверь",
					"абакан",
					"Нижний Новгород",
					"Кострома",
					"Ярославль",
				]}
			/>
			<ModalInput
				addNew={true}
				type={"quantity"}
				modalEditTitle={"Количество"}
				currentValue={quantity}
				onChange={setQuantity}
				possibleValues={[]}
			/>
			<ModalInput
				addNew={true}
				type={"supplyType"}
				modalEditTitle={"Тип поставки"}
				currentValue={supplyType}
				onChange={setSupplyType}
				possibleValues={["Короб", "Монопаллета"]}
			/>
			<ModalInput
				addNew={true}
				type={"storeHouse"}
				modalEditTitle={"Склад"}
				currentValue={storeHouse}
				onChange={setStoreHouse}
				possibleValues={[
					"Склад",
					"СЦ Абакан",
					"Черная грязь",
					"Внуково",
					"Белая дача",
					"Электросталь",
					"Вёшки",
				]}
			/>
			<ModalInput
				addNew={true}
				type={"status"}
				modalEditTitle={"Статус"}
				currentValue={status}
				onChange={setStatus}
				possibleValues={["В пути", "Задерживается"]}
			/>
			<div className="buttons-container">
				<button
					type="button"
					className="modal-button"
					onClick={() =>
						handleUpsertItem({
							id,
							town,
							supplyType,
							quantity,
							storeHouse,
							storeHouseAddress: addresses[storeHouse] as string,
							status,
							date: formatDate(date as Date),
						})
					}
				>
					Сохранить
				</button>
				<button
					type="button"
					className="modal-button-reset"
					onClick={() => onClose()}
				>
					Отменить
				</button>
			</div>
		</div>
	);
}

export function formatDate(date: Date) {
	return (
		date.getDate().toString().padStart(2, "0") +
		"." +
		(date.getMonth() + 1).toString().padStart(2, "0") +
		"." +
		date.getFullYear()
	);
}
function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
