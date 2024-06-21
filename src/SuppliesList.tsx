import React from "react";
import "./SuppliesList.css";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { Modal } from "./modal/Modal.tsx";
// import { useGetSuppliesQuery } from "./suppliesAPI";
import { useDispatch } from "react-redux";
import { suppliesApi } from "./suppliesAPI";

export interface Supply {
	id: string;
	date: string;
	town: string;
	quantity: string;
	supplyType: string;
	storeHouse: string;
	storeHouseAddress: string;
	status: "В пути" | "Задерживается";
}

function SuppliesList() {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [modalSupply, setModalSupply] = useState<Supply | null>(null);

	const [modalEditDeleteVisible, setModalEditDeleteVisible] = useState<
		string | null
	>(null);
	function closeWindowEdit(supply: Supply) {
		handleEditSupply(supply);
		setModalEditDeleteVisible(null);
	}
	function closeWindowDelete(supply: Supply) {
		handleDeleteItem(supply.id);
		setModalEditDeleteVisible(null);
	}
	const dispatch = useDispatch();

	const handleDeleteItem = (id: string) => {
		dispatch(
			//@ts-ignore
			suppliesApi.util.upsertQueryData(
				"getSupplies",
				undefined,
				data?.filter((supply) => supply.id !== id) ?? []
			)
		);
	};

	const { data, isLoading } = suppliesApi.useGetSuppliesQuery(undefined);

	const handleEditSupply = (supply: Supply) => {
		setModalSupply(supply);
		setModalVisible(true);
	};

	const handleSaveSupply = () => {
		setModalSupply(null);
		setModalVisible(false);
	};

	return (
		<React.Fragment>
			<section className="supplies-list">
				<div className="mobile-supplies-list">
					{!isLoading &&
						data &&
						data.map((supply: Supply) => (
							<div className="item-supply" key={nanoid()}>
								<div className="number-date-status-container">
									<div className="number-date-container">
										<div className="number-date-info">
											<p className="supply-info-title">Номер</p>
											<p className="supply-info">{supply.id}</p>
										</div>
										<div className="number-date-info">
											<p className="supply-info-title">Дата поставки</p>
											<p className="supply-info">{supply.date}</p>
										</div>
									</div>
									<div
										className={
											"id-status-container " +
											(supply.status === "В пути"
												? "status-success"
												: "status-fail")
										}
									>
										<p className="status">{supply.status}</p>
									</div>
								</div>
								<div className="edit">
									<img
										src="../img/icon-edit.svg"
										alt="icon-edit"
										onClick={() => handleEditSupply(supply)}
									/>
								</div>
							</div>
						))}
				</div>
				<div className="big-screen-supplies-list">
					<div className="table-headers">
						<p className="table-title id">Номер</p>
						<p className="table-title date">Дата поставки</p>
						<p className="table-title town">Город</p>
						<p className="table-title quantity">Количество</p>
						<p className="table-title supply-type">Тип поставки</p>
						<p className="table-title store-house">Склад</p>
						<p className="table-title status">Статус</p>
					</div>
					{!isLoading &&
						data &&
						data.map((supply: Supply) => (
							<div className="item-supply" key={nanoid()}>
								<div className="item-supply-data">
									<div className="supply-info  id">{supply.id}</div>
									<div className="supply-info  date">{supply.date}</div>
									<div className="supply-info  town">{supply.town}</div>
									<div className="supply-info quantity">
										{supply.quantity + " шт."}
									</div>
									<div className="supply-info  supply-type">
										{supply.supplyType}
									</div>
									<div className="supply-info store-house">
										{supply.storeHouse}
										<p className="store-house-address">
											{supply.storeHouseAddress}
										</p>
									</div>
									<div className={"id-status-container"}>
										<p
											className={
												supply.status === "В пути"
													? "status-success"
													: "status-fail"
											}
										>
											{supply.status}
										</p>
									</div>
								</div>
								<div className="edit-big-screen">
									<img
										src="../img/icon-edit-big-screen.svg"
										alt="icon-edit-big-screen"
										onClick={() => setModalEditDeleteVisible(supply.id)}
									/>
									<EditDeleteInput
										active={modalEditDeleteVisible === supply.id}
										setModalEditDeleteVisible={setModalEditDeleteVisible}
										supply={supply}
										onEdit={closeWindowEdit}
										onDelete={closeWindowDelete}
									/>
								</div>
							</div>
						))}
				</div>
			</section>

			{modalVisible && modalSupply && (
				<Modal
					popUpTitle="Редактирование"
					supply={modalSupply}
					onClose={handleSaveSupply}
				/>
			)}
		</React.Fragment>
	);
}

export default SuppliesList;

function EditDeleteInput({
	active,
	setModalEditDeleteVisible,
	supply,
	onEdit,
	onDelete,
}: {
	active: boolean;
	setModalEditDeleteVisible: (value: string | null) => void;
	supply: Supply;
	onEdit: (supply: Supply) => void;
	onDelete: (supply: Supply) => void;
}) {
	function closeWindowEdit() {
		onEdit(supply);
		setModalEditDeleteVisible(null);
	}
	function closeWindowDelete() {
		onDelete(supply);
		setModalEditDeleteVisible(null);
	}

	return (
		<div className={active ? "options visible" : "options"}>
			<div
				className="possible-option edit-delete"
				onClick={() => {
					closeWindowEdit();
				}}
			>
				Редактировать
			</div>
			<div
				className="possible-option edit-delete"
				onClick={() => {
					closeWindowDelete();
				}}
			>
				Отменить поставку
			</div>
		</div>
	);
}
