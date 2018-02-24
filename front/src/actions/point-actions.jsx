export function addPoint(point){
    return{
      type: "ADD_POINT",
      point
    };
}

export function deleteAllPoints() {
    return{
        type: "DELETE_ALL"
    }
}

export function addAll(points) {
    return{
        type: "ADD_ALL",
        points
    };
}