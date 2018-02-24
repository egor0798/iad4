const initialState = {
    points:[]
};

function points (state=initialState, action) {
    switch(action.type){
        case "ADD_POINT":
            state.points.push(action.point);
            return state;
        case "ADD_ALL":
            // TODO доделать
            state.points.concat(action.points);
            console.log("\nend\n");
            return state;
        case "DELETE_ALL":
            state = initialState;
            console.log("getstate:");
            console.log(state.points);
            return state;
    }

    return state;
}

export default points;