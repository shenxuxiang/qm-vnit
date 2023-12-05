type InitialStateType<S> = () => S | S;
type Action<S> = Partial<S> | ((prevState: S) => Partial<S> | null);
type SetState<S> = (action: Action<S>) => void;
declare function useReducer<S>(initialState: InitialStateType<S>): [S, SetState<S>];
export default useReducer;
