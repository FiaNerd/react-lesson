import { useQuery } from "@tanstack/react-query"
import * as TodosAPI from "../services/TodosAPI"

const useTodos = () => {
	return useQuery(["todos"], TodosAPI.getTodos)
}

export default useTodos

// Skillnaden mellan en Componentn och en Hook
// en component retunerar JSX,
//medan en cusomHook returnerar ett object med egenskaper i,
//så vi kan använda det i en annan fil utan problem
