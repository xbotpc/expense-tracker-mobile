import Dashboard from "../pages/Dashboard";
import ExpenseEntry from "../pages/ExpenseEntry";
import ExpenseList from "../pages/ExpenseList";
import SignUp from "../pages/SignUp";

const screens = [
    // {
    //     name: 'SignUp',
    //     title: '',
    //     component: SignUp,
    //     options: {
    //         headerShown: false
    //     }
    // },
    // {
    //     name: 'Dashboard',
    //     title: '',
    //     component: Dashboard,
    //     options: {
    //         headerShown: false
    //     }
    // },
    {
        name: 'ExpenseList',
        title: 'Expense List',
        component: ExpenseList
    },
    {
        name: 'ExpenseEntry',
        title: 'Expense Entry',
        component: ExpenseEntry
    },
];

export default screens;