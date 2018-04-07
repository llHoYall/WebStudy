import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    todos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, todos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>ToDo</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New ToDo"}
            placeholderTextColor={"#999"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
            underlineColorAndroid={"transparent"}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            {Object.values(todos).reverse().map(todo => (
              <ToDo
                key={todo.id}
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                updateToDo={this._updateToDo}
                {...todo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  _loadToDos = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      const parsedToDos = JSON.parse(todos);
      this.setState({
        loadedToDos: true,
        todos: parsedToDos || {}
      });
    } catch (err) {
      console.log(err);
    }
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObj = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          todos: {
            ...prevState.todos,
            ...newToDoObj
          }
        };
        this._saveToDos(newState.todos);
        return { ...newState };
      });
    }
  };

  _deleteToDo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos
      };
      this._saveToDos(newState.todos);
      return { ...newState };
    });
  };

  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false
          }
        }
      };
      this._saveToDos(newState.todos);
      return { ...newState };
    });
  };

  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true
          }
        }
      };
      this._saveToDos(newState.todos);
      return { ...newState };
    });
  };

  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            text: text
          }
        }
      };
      this._saveToDos(newState.todos);
      return { ...newState };
    });
  };

  _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("todos", JSON.stringify(newToDos));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title: {
    color: "white",
    marginTop: 50,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: "200"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  todos: {
    alignItems: "center"
  }
});
