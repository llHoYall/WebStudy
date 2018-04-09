// Import

// Actions
const START_TIMER = 'START_TIMER';
const STOP_TIMER = 'STOP_TIMER';
const ADD_SECOND = 'ADD_SECOND';

// Action Creators
function startTimer() {
	return {
		type: START_TIMER
	};
}

function stopTimer() {
	return {
		type: STOP_TIMER
	};
}

function addSecond() {
	return {
		type: ADD_SECOND
	};
}

// Reducer
const TIMER_DURATION = 1500;

const initialState = {
	isPlaying: false,
	elapsedTime: 0,
	timerDuration: TIMER_DURATION
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case START_TIMER:
			return applyStartTimer(state);
		case STOP_TIMER:
			return applyStopTimer(state);
		case ADD_SECOND:
			return applyAddSecond(state);
		default:
			return state;
	}
}

// Reducer Functions
function applyStartTimer(state) {
	return {
		...state,
		isPlaying: true
	};
}

function applyStopTimer(state) {
	return {
		...state,
		isPlaying: false,
		elapsedTime: 0
	};
}

function applyAddSecond(state) {
	if (state.elapsedTime < TIMER_DURATION) {
		return {
			...state,
			elapsedTime: state.elapsedTime + 1
		};
	} else {
		return {
			...state,
			isPlaying: false
		};
	}
}

// Export Action Createors
const actionCreators = {
	startTimer,
	stopTimer,
	addSecond
}

export { actionCreators };

// Export Reducer
export default reducer;