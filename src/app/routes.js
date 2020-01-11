import ItemListComponent from "./containers/ItemList";
import ItemComponent from "./containers/Item";

const routes = [
	{ path: '/items/:itemId', Component: ItemComponent },
	{ path: '/items', Component: ItemListComponent},
];

export default routes;
