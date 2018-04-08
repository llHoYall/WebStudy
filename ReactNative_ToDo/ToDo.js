import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
	constructor(props) {
		super(props);
		this.state = { isEditing: false, todoValue: props.text };
	};

	static propTypes = {
		text: PropTypes.string.isRequired,
		isCompleted: PropTypes.bool.isRequired,
		deleteToDo: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		uncompleteToDo: PropTypes.func.isRequired,
		completeToDo: PropTypes.func.isRequired,
		updateToDo: PropTypes.func.isRequired
	};

	state = {
		isEditing: false,
		todoValue: ""
	};

	render() {
		const { isEditing, todoValue } = this.state;
		const { text, id, deleteToDo, isCompleted } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.column}>
					<TouchableOpacity onPress={this._toggleComplete}>
						<View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
					</TouchableOpacity>
					{isEditing ? (
						<TextInput
							style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]}
							value={todoValue}
							multiline={true}
							onChangeText={this._controlInput}
							returnKeyType={"done"}
							onBlur={this._finishEditing}
							underlineColorAndroid={"transparent"}
						/>
					) : (
						<Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
							{text}
						</Text>
					)}
				</View>
				{isEditing ? (
					<View style={styles.actions}>
						<TouchableOpacity onPressOut={this._finishEditing}>
							<View style={styles.actionContainer}>
								<Text style={styles.actionText}>
									<FontAwesome name="check-square" size={25} style={{ color: "black" }} />
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.actions}>
						<TouchableOpacity onPressOut={this._startEditing}>
							<View style={styles.actionContainer}>
								<Text style={styles.actionText}>
									<FontAwesome name="pencil-square" size={25} style={{ color: "black" }} />
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPressOut={(event) => {
								event.stopPropagation;
								deleteToDo(id)
							}}
						>
							<View style={styles.actionContainer}>
								<Text style={styles.actionText}>
									<FontAwesome name="minus-square" size={25} style={{ color: "black" }} />
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}

	_toggleComplete = (event) => {
		event.stopPropagation();
		const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
		if (isCompleted) {
			uncompleteToDo(id);
		} else {
			completeToDo(id);
		}
	};

	_startEditing = (event) => {
		event.stopPropagation();
		this.setState({
			isEditing: true
		});
	};

	_finishEditing = (event) => {
		event.stopPropagation();
		const { todoValue } = this.state;
		const { id, updateToDo } = this.props;
		updateToDo(id, todoValue);
		this.setState({
			isEditing: false
		});
	};

	_controlInput = (text) => {
		this.setState({
			todoValue: text
		});
	};
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: width - 50,
		borderBottomColor: "#bbb",
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 3,
		marginRight: 20
	},
	completedCircle: {
		borderColor: "#bbb",
	},
	uncompletedCircle: {
		borderColor: "#F23657",
	},
	input: {
		width: width / 2,
		paddingBottom: 5,
		marginVertical: 15
	},
	text: {
		fontSize: 20,
		fontWeight: "600",
		marginVertical: 20
	},
	completedText: {
		color: "#bbb",
		textDecorationLine: "line-through"
	},
	uncompletedText: {
		color: "#353839"
	},
	column: {
		flexDirection: "row",
		alignItems: "center",
		width: width / 2
	},
	actions: {
		flexDirection: "row"
	},
	actionContainer: {
		marginVertical: 10,
		marginHorizontal: 10
	}
});