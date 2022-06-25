import {useState} from "react";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Button, Icon, IconRegistry, Layout, Select, SelectItem, Text} from '@ui-kitten/components';
import {EvaIconsPack} from "@ui-kitten/eva-icons";


const HomeScreen = () => {

    const speciesOptions = ['Cattle', 'Buffalo', 'Dog', 'Fowl'];
    const categoryOptions = ['Physiological Parameters', 'Haematological Parameters', 'Blood Bio Chemical'];
    const parameterOptions = ['Rectal temperature', 'Respiration Rate', 'Pulse Rate'];

    let [speciesSelectedIndex, setSpeciesSelectedIndex] = useState(undefined);
    let [categorySelectedIndex, setCategorySelectedIndex] = useState(undefined);
    let [parameterSelectedIndex, setParameterSelectedIndex] = useState(undefined);

    let speciesSelectedValue = speciesSelectedIndex ? speciesOptions[speciesSelectedIndex.row] : undefined;
    let categorySelectedValue = categorySelectedIndex ? categoryOptions[categorySelectedIndex.row] : undefined;
    let parameterSelectedValue = parameterSelectedIndex ? parameterOptions[parameterSelectedIndex.row] : undefined;

    const onSpeciesSelect = index => {
        setSpeciesSelectedIndex(index);
        setCategorySelectedIndex(undefined);
        setParameterSelectedIndex(undefined);
    };

    const onCategorySelect = index => {
        setCategorySelectedIndex(index);
        setParameterSelectedIndex(undefined);
    };
    const onParameterSelect = index => {
        setParameterSelectedIndex(index);
    };

    const renderOption = (title: string, index: number) => (
        <SelectItem title={title} key={index}/>
    );

    const SearchIcon = (props) => (
        <Icon name='search' {...props} />
    );


    return (

        <Layout level='1' style={{flex: 1, justifyContent: 'center'}}>

            <Layout level='2' style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text category='h1'>VetMate</Text>
            </Layout>


            <Layout level='3'>

                <Select key='species-select'
                        placeholder='Select Species'
                        selectedIndex={speciesSelectedIndex}
                        value={speciesSelectedValue}
                        onSelect={onSpeciesSelect}>
                    {speciesOptions.map(renderOption)}
                </Select>

                <Select key='category-select'
                        disabled={!speciesSelectedValue}
                        placeholder='Select Category'
                        selectedIndex={categorySelectedIndex}
                        value={categorySelectedValue}
                        onSelect={onCategorySelect}>
                    {categoryOptions.map(renderOption)}
                </Select>

                <Select key='parameter-select'
                        disabled={!(speciesSelectedValue && categorySelectedValue)}
                        placeholder='Select Parameter'
                        selectedIndex={parameterSelectedIndex}
                        value={parameterSelectedValue}
                        onSelect={onParameterSelect}>
                    {parameterOptions.map(renderOption)}
                </Select>

                <Button status='primary' style={{margin: 5}} accessoryLeft={SearchIcon}>
                    PRIMARY
                </Button>

            </Layout>
        </Layout>
    );

};

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
            <HomeScreen/>
        </ApplicationProvider>
    </>
);

