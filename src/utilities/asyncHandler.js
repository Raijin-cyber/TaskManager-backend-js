const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
    .catch(next);
} 

export default asyncHandler;

/*
    const asyncHandler = (fn) till here we are made a function which takes another function as an argument => (req, res, next) => till here it is completely a new function which is defined and it has those three arguments req, res, next {
        Promise.resolve(fn(req, res, next))
        .catch(next);
    } 
*/ 