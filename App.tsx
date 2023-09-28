import {useState, useEffect} from "react";
import * as eva from '@eva-design/eva';
import {StyleSheet} from 'react-native';
import {
    ApplicationProvider,
    Avatar,
    Button,
    Icon,
    IconRegistry,
    Layout,
    Select,
    SelectItem,
    Text
} from '@ui-kitten/components';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {DATA} from "./data/data";


const HomeScreen = () => {

    let [speciesSelectedIndex, setSpeciesSelectedIndex] = useState(undefined);
    let [categorySelectedIndex, setCategorySelectedIndex] = useState(undefined);
    let [parameterSelectedIndex, setParameterSelectedIndex] = useState(undefined);
    const [species, setSpecies] = useState([]);

    useEffect(() => {
        fetch('https://api.npoint.io/da923ccbf7de7586179e')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSpecies(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const speciesOptions = species.map(data => data.name);
    const categoryOptions = speciesSelectedIndex ? DATA.species[speciesSelectedIndex - 1].categories.map(data => data.name) : [];
    const parameterOptions = speciesSelectedIndex && categorySelectedIndex ?
        DATA.species[speciesSelectedIndex - 1].categories
            .map(data => data.parameters)[categorySelectedIndex - 1].map(data => data.name) : [];

    let speciesSelectedValue = speciesSelectedIndex ? speciesOptions[speciesSelectedIndex.row] : undefined;
    let categorySelectedValue = categorySelectedIndex ? categoryOptions[categorySelectedIndex.row] : undefined;
    let parameterSelectedValue = parameterSelectedIndex ? parameterOptions[parameterSelectedIndex.row] : undefined;

    let finalValue = speciesSelectedIndex && categorySelectedIndex && parameterSelectedIndex ?
        DATA.species[speciesSelectedIndex - 1].categories[categorySelectedIndex - 1].parameters[parameterSelectedIndex - 1].value : undefined;

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

    const RefreshIcon = (props) => (
        <Icon name='refresh-outline' {...props} />
    );

    const resetSelections = () => {
        setSpeciesSelectedIndex(undefined);
        setCategorySelectedIndex(undefined);
        setParameterSelectedIndex(undefined);
    }


    return (

        <Layout level='1' style={{flex: 1, justifyContent: 'center'}}>

            <Layout level='2' style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Layout level='2' style={{flexDirection: 'row'}}>
                    <Avatar style={styles.avatar} size='giant' source={require('./assets/logo.svg')}/>
                    <Text category='h1'>VetMate</Text>
                </Layout>
            </Layout>


            <Layout level='3'>

                <Text style={styles.text} status='info'>Select options to get the reference value</Text>

                <Select key='species-select'
                        style={styles.select}
                        placeholder='Select Species'
                        selectedIndex={speciesSelectedIndex}
                        value={speciesSelectedValue}
                        onSelect={onSpeciesSelect}>
                    {speciesOptions.map(renderOption)}
                </Select>

                <Select key='category-select'
                        style={styles.select}
                        disabled={!speciesSelectedValue}
                        placeholder='Select Category'
                        selectedIndex={categorySelectedIndex}
                        value={categorySelectedValue}
                        onSelect={onCategorySelect}>
                    {categoryOptions.map(renderOption)}
                </Select>

                <Select key='parameter-select'
                        style={styles.select}
                        disabled={!(speciesSelectedValue && categorySelectedValue)}
                        placeholder='Select Parameter'
                        selectedIndex={parameterSelectedIndex}
                        value={parameterSelectedValue}
                        onSelect={onParameterSelect}>
                    {parameterOptions.map(renderOption)}
                </Select>

                {finalValue ?
                    <Text category='label' style={styles.text} status='info'>Value : {finalValue}</Text> : <></>}

                <Layout style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                    <Button status='primary' style={styles.button} accessoryLeft={RefreshIcon}
                            onPress={resetSelections}>
                        Reset
                    </Button>
                </Layout>


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

const styles = StyleSheet.create({
    select: {
        flex: 1,
        margin: 2
    },
    button: {margin: 5},
    text: {margin: 5},
    avatar: {}
});

