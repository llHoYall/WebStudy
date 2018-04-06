import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
	state = {
		isEditing: false,
		isCompleted: false,
		todoValue: ""
	};

	render() {
		const { isEditing, isCompleted, todoValue } = this.state;
		const { text } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.column}>
					<TouchableOpacity onPress={this._toggleComplete}>
						<View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
					</TouchableOpacity>
					{isEditing ? (
						<TextInput style={[styles.input, styles.text, isCompleted ? styles.completedText : styles.uncompletedText]} value={todoValue} multiline={true} onChangeText={this._controlInput} returnKeyType={"done"} onBlur={this._finishEditing} />
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
								<Text style={styles.actionText}>V</Text>
							</View>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.actions}>
						<TouchableOpacity onPressOut={this._startEditing}>
							<View style={styles.actionContainer}>
								<Text style={styles.actionText}>E</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={styles.actionContainer}>
								<Text style={styles.actionText}>X</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}

	_toggleComplete = () => {
		this.setState(prevState => {
			return {
				isCompleted: !prevState.isCompleted
			};
		});
	}

	_startEditing = () => {
		const { text } = this.props;
		this.setState({
			isEditing: true,
			todoValue: text
		});
	}

	_finishEditing = () => {
		this.setState({
			isEditing: false
		});
	}

	_controlInput = (text) => {
		this.setState({
			todoValue: text
		});
	}
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
		marginVertical: 15,
		width: width / 2
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
		justifyContent: "space-between",
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