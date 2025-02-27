import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { setSearchQuery } from '../../redux/slice/roomSlice';
import { Button, Slider } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

const filterData = [
    {
        filterType: "Location",
        array: ["Dehradun", "Selaqui", "Birgunj", "Kalaiya", "Mumbai"],
    },
    {
        filterType: "Room Type",
        array: ["Funished", "Flat", "Room"],
    }
];

const PriceSlider = ({ onChange }) => {
    const [value, setValue] = useState([0, 100000]);
    const min = 0;
    const max = 100000;

    const handleChange = (newValue) => {
        setValue(newValue);
        onChange(`₹${newValue[0].toLocaleString()}-₹${newValue[1].toLocaleString()}`);
    };

    return (
        <div className="py-4">
            <div className="flex justify-between text-sm mb-2">
                <span>₹{value[0].toLocaleString()}</span>
                <span>₹{value[1].toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
                <FrownOutlined className="text-gray-400" />
                <Slider
                    range
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    step={5000}
                    className="flex-grow"
                    trackStyle={[{ backgroundColor: '#3b82f6' }]}
                    handleStyle={[
                        { borderColor: '#3b82f6', backgroundColor: '#fff' },
                        { borderColor: '#3b82f6', backgroundColor: '#fff' }
                    ]}
                />
                <SmileOutlined className="text-gray-400" />
            </div>
        </div>
    );
};

export const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };
    const handleReset =()=>{
        setSelectedValue("");
    }

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full max-w-sm bg-white p-5 rounded-xl shadow-lg border border-gray-100'>
            <h1 className='font-bold text-xl mb-3 text-gray-800'>Filter Listings</h1>
            <hr className='mb-3 border-gray-200' />
            <Button onClick={handleReset}>Reset</Button>
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData?.map((data) => (
                    <div key={data?.filterType} className='mb-4'>
                        <h1 className='font-semibold text-md mb-2 text-gray-700'>{data?.filterType}</h1>
                        {data?.array?.map((item, idx) => {
                            const itemId = `id${data?.filterType}-${idx}`;
                            return (
                                <div className='flex items-center space-x-2 my-2' key={itemId}>
                                    <RadioGroupItem 
                                        value={item} 
                                        id={itemId} 
                                        className='text-blue-600 border-2 border-gray-300 w-5 h-5'
                                    />
                                    <label 
                                        htmlFor={itemId} 
                                        className='text-sm text-gray-600 hover:text-gray-900 cursor-pointer'
                                    >
                                        {item}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                ))}
                
                <div className='mb-4'>
                    <h1 className='font-semibold text-md mb-2 text-gray-700'>Price Range</h1>
                    <PriceSlider onChange={changeHandler} />
                </div>
            </RadioGroup>
        </div>
    );
};