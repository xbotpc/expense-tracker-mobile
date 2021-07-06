import CarIcon from '../assets/SVG/directions_car_black.svg';
import HomeIcon from '../assets/SVG/home_black.svg';
import HospitalIcon from '../assets/SVG/medication_black.svg';
import PetIcon from '../assets/SVG/pets_black.svg';
import FoodIcon from '../assets/SVG/restaurant_black.svg';
import MobileIcon from '../assets/SVG/smartphone_black.svg';
import MoneyIcon from '../assets/SVG/savings_black.svg';
import ClothesIcon from '../assets/SVG/clothes.svg';
import TVIcon from '../assets/SVG/tv.svg';

export const CAR = 'CAR';
export const PET = 'PET';
export const MOBILE_RECHARGE = 'MOBILE RECHARGE';
export const SALARY = 'SALARY';
export const MEDICAL = 'MEDICAL';
export const FOOD = 'FOOD';
export const TV_RECHARGE = 'TV RECHARGE';
export const CLOTHES = 'CLOTHES';

export const TRANSACTION_TYPES = [
    {
        type: CAR,
        icon: CarIcon,
        isExpense: true
    },
    {
        type: PET,
        icon: PetIcon,
        isExpense: true
    },
    {
        type: MOBILE_RECHARGE,
        icon: MobileIcon,
        isExpense: true
    },
    {
        type: SALARY,
        icon: MoneyIcon,
        isExpense: false
    },
    {
        type: MEDICAL,
        icon: HospitalIcon,
        isExpense: true
    },
    {
        type: FOOD,
        icon: FoodIcon,
        isExpense: true
    },
    {
        type: TV_RECHARGE,
        icon: TVIcon,
        isExpense: true
    },
    {
        type: CLOTHES,
        icon: ClothesIcon,
        isExpense: true
    }
]