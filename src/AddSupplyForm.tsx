import "./AddSupplyForm.css";
import React, { useState } from "react";
import { Modal } from "./modal/Modal.tsx";
import { useDispatch } from "react-redux";
import { suppliesApi } from "./suppliesAPI";
import { Supply } from "./SuppliesList";

function AddSupplyForm() {
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	return (
		<React.Fragment>
			<section className="supply-form">
				<div className="sections-bar">
					<div className="chosen">Поставки</div>
					<div>Товары</div>
					<div>Цены и скидки</div>
					<div>Аналитика</div>
					<div>Реклама</div>
				</div>
				<div className="supply-title-union">
					<p className="supply-title">Поставки</p>
					<div className="big-screen-widgets">
						<div
							className="union-title-container"
							onClick={() => setModalVisible(true)}
						>
							<div className="union">
								<img src="../img/union.svg" alt="union" />
							</div>
							<p id="add">Добавить поставку</p>
						</div>
						<div className="sorting-search">
							<SortingInput />
							<div className="search">
								<input
									type="text"
									name="search"
									id="search"
									placeholder="Поиск..."
								/>
							</div>
							<div className="search-button">
								<img src="../img/icon-search.svg" alt="icon-search" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{modalVisible && (
				<Modal
					popUpTitle="Новая поставка"
					onClose={() => setModalVisible(false)}
				/>
			)}
		</React.Fragment>
	);
}

export default AddSupplyForm;

function SortingInput() {
	const [option, setOption] = useState<string>("По номеру");
	const [valuesVisible, setValuesVisible] = useState<boolean>(false);
	const { data } = suppliesApi.useGetSuppliesQuery(undefined);

	const dispatch = useDispatch();
	const handleSorting = (field: keyof Supply) => {
		const sortedData = [...(data ?? [])];
		sortedData.sort((a, b) => a[field].localeCompare(b[field]));
		dispatch(
			//@ts-ignore
			suppliesApi.util.upsertQueryData("getSupplies", undefined, sortedData)
		);
	};
	const closeWindowSetValue = (value: string, field: keyof Supply) => {
		setOption(value);
		handleSorting(field);
		console.log(valuesVisible);
	};

	return (
		<React.Fragment>
			<div className="select">
				<div className="option">{option}</div>
				<img
					src="../img/icon-arrow-down.svg"
					alt="icon-arrow-down"
					onClick={() => setValuesVisible(true)}
				/>
				{valuesVisible && (
					<div className="options visible">
						<div
							className="possible-option"
							onClick={() => {
								closeWindowSetValue("По номеру", "id");
							}}
						>
							По номеру
						</div>
						<div
							className="possible-option"
							onClick={() => {
								closeWindowSetValue("По городу", "town");
							}}
						>
							По городу
						</div>
						<div
							className="possible-option"
							onClick={() => {
								closeWindowSetValue("По типу поставки", "supplyType");
							}}
						>
							По типу поставки
						</div>
						<div
							className="possible-option"
							onClick={() => {
								closeWindowSetValue("По статусу", "status");
							}}
						>
							По статусу
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}
