import {useState} from "react";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Select, SelectItem, Text} from '@ui-kitten/components';


const VetDropdown = (props: {placeholder: string, selectOptions: Array<String>}) => {

    const [selectedIndex, setSelectedIndex] = useState(null);
    const selectedValue = selectedIndex ? props.selectOptions[selectedIndex.row] : '';

    const renderOption = (title: string) => (
        <SelectItem title={title}/>
    );
    return (

        <Select
            placeholder={props.placeholder}
            selectedIndex={selectedIndex}
            value={selectedValue}
            onSelect={index => setSelectedIndex(index)}>
            {props.selectOptions.map(renderOption)}
        </Select>
    )
};

const HomeScreen = () => {

    let speciesOptions = ['Cattle', 'Buffalo', 'Dog', 'Fowl'];
    let categoryOptions = ['Physiological Parameters', 'Haematological Parameter', 'Blood BioChemical'];
    let parameterOptions = ['Rectal temperature', 'Respiration Rate', 'Pulse Rate'];

    return (
        <Layout level='1' style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Text category='h1'>VetMate</Text>

            <VetDropdown placeholder={'Select Species'} selectOptions={speciesOptions}></VetDropdown>
            <VetDropdown placeholder={'Select Category'} selectOptions={categoryOptions}></VetDropdown>
            <VetDropdown placeholder={'Select Parameter'} selectOptions={parameterOptions}></VetDropdown>
        </Layout>
    );

};

export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
    </ApplicationProvider>
);
