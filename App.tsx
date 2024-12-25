import {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {StyleSheet, View} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Select,
  SelectItem,
  Text,
  Card,
  Divider,
  Modal, Layout, Popover,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const HomeScreen = () => {

  let [speciesSelectedIndex, setSpeciesSelectedIndex] = useState(undefined);
  let [categorySelectedIndex, setCategorySelectedIndex] = useState(undefined);
  let [parameterSelectedIndex, setParameterSelectedIndex] = useState(undefined);
  let [searchPressed, setSearchPressed] = useState(false);
  const [species] = useState(dataSource);

  const speciesOptions = species.map(data => data.name);
  const categoryOptions = speciesSelectedIndex
    ? species[speciesSelectedIndex - 1].categories.map(data => data.name)
    : [];
  const parameterOptions =
    speciesSelectedIndex && categorySelectedIndex
      ? species[speciesSelectedIndex - 1].categories
          .map(data => data.parameters)
          [categorySelectedIndex - 1].map(data => data.name)
      : [];

  let speciesSelectedValue = speciesSelectedIndex
    ? speciesOptions[speciesSelectedIndex.row]
    : undefined;
  let categorySelectedValue = categorySelectedIndex
    ? categoryOptions[categorySelectedIndex.row]
    : undefined;
  let parameterSelectedValue = parameterSelectedIndex
    ? parameterOptions[parameterSelectedIndex.row]
    : undefined;

  let finalValue =
    speciesSelectedIndex && categorySelectedIndex && parameterSelectedIndex
      ? species[speciesSelectedIndex - 1].categories[categorySelectedIndex - 1]
          .parameters[parameterSelectedIndex - 1].value
      : undefined;

  const onSpeciesSelect = index => {
    setSearchPressed(false);
    setSpeciesSelectedIndex(index);
    setCategorySelectedIndex(undefined);
    setParameterSelectedIndex(undefined);
  };

  const onCategorySelect = index => {
    setSearchPressed(false);
    setCategorySelectedIndex(index);
    setParameterSelectedIndex(undefined);
  };

  const onParameterSelect = index => {
    setSearchPressed(false);
    setParameterSelectedIndex(index);
  };

  const renderOption = (title: string, index: number) => (
    <SelectItem title={title} key={index} />
  );

  const RefreshIcon = props => <Icon name="refresh-outline" {...props} />;

  const SearchIcon = props => <Icon name="search-outline" {...props} />;
  
  const PeopleIcon = props => <Icon name="people-outline" {...props} />;

  const searchSelections = () => {
    setSearchPressed(true);
  };

  const resetSelections = () => {
    setSearchPressed(false);
    setSpeciesSelectedIndex(undefined);
    setCategorySelectedIndex(undefined);
    setParameterSelectedIndex(undefined);
  };

  const AppForm = () => (

    <Card style={styles.card} header={AppFormHeader}>
        
        <View>
          
          <View style={styles.selectContianer}>
            <Text style={styles.selectLabel}>Species</Text>
            <Select
              key="species-select"
              style={styles.select}
              placeholder="Select Species"
              selectedIndex={speciesSelectedIndex}
              value={speciesSelectedValue}
              onSelect={onSpeciesSelect}>
              {speciesOptions.map(renderOption)}
            </Select>
          </View>

          <View style={styles.selectContianer}>
            <Text style={styles.selectLabel}>Category</Text>
            <Select
              key="category-select"
              style={styles.select}
              disabled={!speciesSelectedValue}
              placeholder="Select Category"
              selectedIndex={categorySelectedIndex}
              value={categorySelectedValue}
              onSelect={onCategorySelect}>
              {categoryOptions.map(renderOption)}
            </Select>
          </View>

          <View style={styles.selectContianer}>
            <Text style={styles.selectLabel}>Parameter</Text>
            <Select
              key="parameter-select"
              style={styles.select}
              disabled={!(speciesSelectedValue && categorySelectedValue)}
              placeholder="Select Parameter"
              selectedIndex={parameterSelectedIndex}
              value={parameterSelectedValue}
              onSelect={onParameterSelect}>
              {parameterOptions.map(renderOption)}
            </Select>
          </View>

          <View
            style={styles.footerContainer}>
            <Button
              status="primary"
              style={styles.footerControl}
              accessoryLeft={SearchIcon}
              onPress={searchSelections}>
              Search
            </Button>
          </View>

        </View>
      </Card>
  );

  const ParameterDetails = () => (
    <Card style={styles.card} header={ParameterDetailsHeader}>

      <View>

          <View>
            <Text category='label' status='danger'>Disclaimer:</Text>
            <Text status='warning'>
            The reference values provided in this app are based on scientific literature. This app is designed for students, persons related to veterinary profession and should be used with caution, considering individual animal variations. Users are responsible for interpreting values appropriately, and the app developers cannot be held liable for any consequences resulting from its use.
            </Text>
          </View>
          
          <View style={styles.detailsContianer}>
            <Text style={styles.detailsLabel}>Species</Text>
            <Text style={styles.detailsValue}>{speciesSelectedValue}</Text>
          </View>

          <View style={styles.detailsContianer}>
            <Text style={styles.detailsLabel}>Category</Text>
            <Text style={styles.detailsValue}>{categorySelectedValue}</Text>
          </View>

          <View style={styles.detailsContianer}>
            <Text style={styles.detailsLabel}>Parameter</Text>
            <Text style={styles.detailsValue}>{parameterSelectedValue}</Text>
          </View>

          <View style={styles.detailsContianer}>
          <Text style={styles.detailsLabel}>Value</Text>
          <Text style={styles.detailsValue} status='info'>
            {finalValue}
          </Text>
        </View>

        <View
            style={styles.footerContainer}>
          <Button
            status="primary"
            style={styles.footerControl}
            accessoryLeft={RefreshIcon}
            onPress={resetSelections}>
            Reset
          </Button>
        </View>
      </View>
    </Card>
  );

  const [contributorsVisible, setContributorsVisible] = useState(false);

  const renderContributorsToggleButton = (): React.ReactElement => (
    <Button accessoryLeft={PeopleIcon} onPress={() => setContributorsVisible(true)}>
      Contributors
    </Button>
  );

  const BottomSection = () => (

    <Card style={styles.bottomCard}>

      <View style={styles.buttonContainer}>

        <Popover
          anchor={renderContributorsToggleButton}
          visible={contributorsVisible}
          placement='top'
          onBackdropPress={() => setContributorsVisible(false)}
        >
          <Card style={styles.card}>
            <Text category='label' status='info'>Contributors:</Text>
            <Text>Jyotsana shakkarpude </Text>
            <Text>Deepika Diana Jesse Arland</Text>
            <Text>Sanju Mandal</Text>
            <Text>Somesh Meshram</Text>
            <Text>Anand Kumar Jain</Text>
            <Text>Aditya Mishra</Text>
            <Text>Kavita Rawat</Text>
            <Text>Archana Jain</Text>
            <Text>Manoj Kumar Ahirwar</Text>
          </Card>
        </Popover>
      </View>
    </Card>
  );

  return (
    <>
      <View style={styles.banner}>
        <Text category="h1">😻 PocketVetMate</Text>
      </View>

      {
        !(searchPressed && finalValue) ? <AppForm></AppForm> : <></>
      }

      {
        searchPressed && finalValue ? <ParameterDetails></ParameterDetails> : <></>
      }

      <BottomSection></BottomSection>
      
    </>
  );
};

const AppFormHeader = (props: ViewProps): React.ReactElement => (
  <View {...props}>
    <Text category="h5">Select Options</Text>
  </View>
);

const ParameterDetailsHeader = (props: ViewProps): React.ReactElement => (
  <View {...props}>
    <Text category="h5">Parameter Details</Text>
  </View>
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  banner: {flexDirection: 'row', justifyContent: 'space-around'},
  container: {
    //flex: 1,
    //justifyContent: 'center'
  },
  select: {
    //flex: 1,
    margin: 2,
  },
  selectContianer: {
    minHeight: 20,
    padding: 5,
  },
  selectLabel: {
    fontWeight: 'bold',
  },
  detailsContianer: {
    minHeight: 20,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  detailsLabel: {
    flexBasis: 80,
    flexGrow: 0,
    flexShrink: 0,
    fontWeight: 'bold',
  },
  detailsValue: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
  },
  text: {
    margin: 5,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  bottomCard: {
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginVertical: 10,
  },
});

const dataSource = [
  {
    "name": "Cattle",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "140/95"
          },
          {
            "name": "Mean blood pressure",
            "value": "120"
          },
          {
            "name": "Heart Rate per minute",
            "value": "48-84"
          },
          {
            "name": "Pulse rate per minute",
            "value": "40-60"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "101.0-101.5°F"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "16-22/min"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "4000 mL"
          },
          {
            "name": "Catheter site for BP (artery)",
            "value": "Auricular"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "5-6"
          },
          {
            "name": "Coagulation time (in minutes)",
            "value": "6"
          },
          {
            "name": "ESR (mm/h)",
            "value": "0-1"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "8-15"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "24-46"
          },
          {
            "name": "MCH (pg)",
            "value": "11-17"
          },
          {
            "name": "MCHC (%)",
            "value": "30-36"
          },
          {
            "name": "MCV (fL)",
            "value": "42-60"
          },
          {
            "name": "pH",
            "value": "7.38"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "1-8"
          },
          {
            "name": "Specific gravity",
            "value": "1.043"
          },
          {
            "name": "TEC (million/µL)",
            "value": "5.0-10.0"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "4.0-12.0"
          },
          {
            "name": "Life span of RBC",
            "value": "160"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "0.71 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": "0.0 - 1.72 mmol/L"
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": "0.0 - 0.11 mmol/L"
          },
          {
            "name": "Albumin (g/dL )",
            "value": "3.0 - 3.5 g/dL"
          },
          {
            "name": "A / G ratio",
            "value": "8.4 -9.4"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": "17.0 - 29.0 mmol/L"
          },
          {
            "name": "Bile acid, total (TBA) (µmol/L)",
            "value": "20.0 - 80.0 µmol/L"
          },
          {
            "name": "Bilirubin (Conjugated); CB (mg/dL)",
            "value": "0.04 -0.44 mg/dL"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.01 -0.5 mg/dL"
          },
          {
            "name": "Bilirubin (Unconjugated); UCB (mg/dL)",
            "value": "0.03"
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "20.0 - 30.0 mg/dL"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "9.7 - 12.4 mg/dL"
          },
          {
            "name": "Carbon dioxide (TCO2)",
            "value": "21.2 - 32.2 mmol/L"
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "97.0 - 111.0 mEq/L"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "80.0 - 120.0 mg/dL"
          },
          {
            "name": "Copper (µg/dL)",
            "value": "32.8 - 35.2 µg/dL"
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.0 - 2.0 mg/dL"
          },
          {
            "name": "Fibrinogen (g/dL )",
            "value": "3.0 - 7.0 g/dL"
          },
          {
            "name": "Globulin (g/dL )",
            "value": "3.0 - 3.4 g/dL"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "45.0 -75.0 mg/dL"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": "76.0 - 113.0 mg/dL"
          },
          {
            "name": "Icteric Index",
            "value": "5.0 - 15.0 Unit"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "57.0 -162.0 µg/dL"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": "5.0 - 20.0 mg/dL"
          },
          {
            "name": "Lead (µg/dL)",
            "value": "0.0 - 24.0 µg/dL"
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "1.8 - 2.3 mg/dL"
          },
          {
            "name": "Phosphorus (mg/dL)",
            "value": "5.6 - 6.5 mg/dL"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "3.9 - 5.8 mEq/L"
          },
          {
            "name": "Protein (Total) (g/dL )",
            "value": "6.7 - 7.4 g/dL"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "132.0 - 152.0 mEq/L"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "0.0 - 14.0 mg/dL"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "0.0 - 2.0 mg/dL"
          }
        ]
      },
      {
        "name": "Hormonal Parameter",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": "20-150"
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": "5-25"
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": "30-300"
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": "10-150"
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": "20-100"
          },
          {
            "name": "CORTISOL (µg/dL)",
            "value": "1-3"
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": "10-40"
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "ERYTHROPOIETIN (mIU/mL)",
            "value": "5-50"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "5-25"
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": "50-300"
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": "2-10"
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": "10-200"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "5-35"
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": "2-15"
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": "0.1-10"
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": "10-80"
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": "5-300"
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "OXYTOXIN (µU/mL)",
            "value": "1-10"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": "5-50"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "5-40"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "5-100"
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": "10-500"
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": "5-50"
          },
          {
            "name": "RENIN (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": "200-500"
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": "10-60"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "2-10"
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": "0.5-10"
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": "0.1-2"
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "2-5"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "100-300"
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": "1-12"
          }
        ]
      },
      {
        "name": "Milk Composition (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "86.6"
          },
          {
            "name": "Fat",
            "value": "4.6"
          },
          {
            "name": "Protein",
            "value": "3.4"
          },
          {
            "name": "Lactose",
            "value": "4.9"
          },
          {
            "name": "Ash",
            "value": "0.7"
          }
        ]
      },
      {
        "name": "Physicochemical Characteristics of milk",
        "parameters": [
          {
            "name": "pH",
            "value": "6.4-6.6"
          },
          {
            "name": "Titrable acidity (%)",
            "value": "0.13-0.14"
          },
          {
            "name": "Specific gravity (at 60 ºF)",
            "value": "1.028-1.030"
          },
          {
            "name": "Freezing point (ºC)",
            "value": "-0.512 to -0.572ºC ( Avg-0.547)"
          },
          {
            "name": "Boiling point (ºC)",
            "value": "100.17"
          },
          {
            "name": "Colour",
            "value": "Yellowish creamy white"
          },
          {
            "name": "Viscosity (cP)",
            "value": "1.86"
          },
          {
            "name": "Surface tension (mN/m)",
            "value": "52"
          },
          {
            "name": "Refractive index at (20 ºC)",
            "value": "1.3461"
          },
          {
            "name": "Fat globule size (µ)",
            "value": "3.85"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "0.0 - 480.0 U/L"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "11.0 - 40.0 U/L"
          },
          {
            "name": "Arginase (U/L)",
            "value": "1.0 - 30.0"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "78.0 -132.0 U/L"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "4.8 - 12.1 U/L"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "6.1 - 17.4 U/L"
          },
          {
            "name": "LDH (U/L)",
            "value": "692.0 - 1445.0 U/L"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "\u003C1"
          },
          {
            "name": "Eosinophils",
            "value": "2-5"
          },
          {
            "name": "Lymphocytes",
            "value": "60-65"
          },
          {
            "name": "Monocytes",
            "value": "5"
          },
          {
            "name": "Neutrophils",
            "value": "25-30"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "2 to 3 : 1"
          }
        ]
      }
    ]
  },
  {
    "name": "Buffalo",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "155/105"
          },
          {
            "name": "Mean blood pressure",
            "value": "123"
          },
          {
            "name": "Heart rate per minute",
            "value": ""
          },
          {
            "name": "Pulse Rate per minute",
            "value": "42-62/min"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "99-102°F"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "22-28/min"
          },
          {
            "name": "Tidal volume (mL)",
            "value": ""
          },
          {
            "name": "Catheter site for BP (artery)",
            "value": "Auricular"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "8"
          },
          {
            "name": "Coagulation time",
            "value": "15-16 seconds"
          },
          {
            "name": "ESR (mm/h)",
            "value": "17 - 69"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "9 - 13"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "26 - 34"
          },
          {
            "name": "MCH (pg)",
            "value": "13 - 20"
          },
          {
            "name": "MCHC (%)",
            "value": "30 - 38"
          },
          {
            "name": "MCV (fL)",
            "value": "41 - 55"
          },
          {
            "name": "pH",
            "value": "7.39-7.47"
          },
          {
            "name": "Platelets (lakhs/µL)",
            "value": "1.37-6.00"
          },
          {
            "name": "Specific gravity",
            "value": "1.052 - 1.064"
          },
          {
            "name": "TEC (million/µL)",
            "value": "5.1 - 8.3"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "6.2 - 13.0"
          },
          {
            "name": "Life span of RBC",
            "value": "160"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "0.31-1.85 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": "0.0 - 1.72 mmol/L"
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": "0.0 - 0.11 mmol/L"
          },
          {
            "name": "Albumin (g/dL )",
            "value": "3.030–3.550 g/dL"
          },
          {
            "name": "A / G ratio",
            "value": "0.56–1.67"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": "17.0 - 29.0 mmol/L"
          },
          {
            "name": "Bile acid, total (TBA) (µmol/L)",
            "value": "20.0 - 80.0 µmol/L"
          },
          {
            "name": "Bilirubin (Conjugated); CB (mg/dL)",
            "value": "0.00–0.40 mg/dL"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "1.00–2.00 mg/dL"
          },
          {
            "name": "Bilirubin (Unconjugated); UCB (mg/dL)",
            "value": "0.20–0.64 mg/dL"
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "20.0–30.0 mg/dL"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "8.55-13.4  mg/dL"
          },
          {
            "name": "Carbon dioxide (TCO2)",
            "value": "21.2 - 32.2 mmol/L"
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "97.0–111.0 mEq/L"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "43.5-113.5 mg/dL"
          },
          {
            "name": "Copper (µg/dL)",
            "value": "58–136 µg/dL"
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.00–2.00 mg/dL"
          },
          {
            "name": "Fibrinogen (g/dL )",
            "value": "0.2–0.8 g/dL"
          },
          {
            "name": "Globulin (g/dL )",
            "value": "3.000–3.480 g/dL"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "40.0-75 mg/dL"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": "76.0 - 113.0 mg/dL"
          },
          {
            "name": "Icteric Index",
            "value": "5.0 - 15.0 Unit"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "81.7-242.4 µg/dL"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": "5.0 - 20.0 mg/dL"
          },
          {
            "name": "Lead (µg/dL)",
            "value": "0.0 - 24.0 µg/dL"
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "1.78–3.59 mg/dL"
          },
          {
            "name": "Phosphorus (mg/dL)",
            "value": "3.0-5.5  mg/dL"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "3.5-5.5 mEq/L"
          },
          {
            "name": "Protein (Total) (g/dL )",
            "value": "6.740–7.460 g/dL"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "135.0-147.0 mEq/L"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "4.02–49.72 mg/dL"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "2.19-4.09 mg/dL"
          }
        ]
      },
      {
        "name": "Milk Composition (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "84.2"
          },
          {
            "name": "Fat",
            "value": "6.6"
          },
          {
            "name": "Protein",
            "value": "3.9"
          },
          {
            "name": "Lactose",
            "value": "5.2"
          },
          {
            "name": "Ash",
            "value": "0.8"
          }
        ]
      },
      {
        "name": "Physicochemical Characteristics of milk",
        "parameters": [
          {
            "name": "pH",
            "value": "6.7-6.8"
          },
          {
            "name": "Titrable acidity (%)",
            "value": "0.14-0.15"
          },
          {
            "name": "Specific gravity (at 60 ºF)",
            "value": "1.030-1.032"
          },
          {
            "name": "Freezing point (ºC)",
            "value": "-0.521 to -0.575ºC (Avg-0.549)"
          },
          {
            "name": "Boiling point (ºC)",
            "value": "100.55"
          },
          {
            "name": "Colour",
            "value": "Creamy white"
          },
          {
            "name": "Viscosity (cP)",
            "value": "2.04"
          },
          {
            "name": "Surface tension (mN/m)",
            "value": "50.5"
          },
          {
            "name": "Refractive index at (20 ºC)",
            "value": "1.3477"
          },
          {
            "name": "Fat globule size (µ)",
            "value": "5.01"
          }
        ]
      },
      {
        "name": "Meat Composition (Lean) (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "76-78"
          },
          {
            "name": "Protein",
            "value": "18-22"
          },
          {
            "name": "Lipid",
            "value": "1-2"
          },
          {
            "name": "Ash",
            "value": "1-1.5"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (ALP) (U/L)",
            "value": "80.33 - 364.81"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "8.58 - 46.19"
          },
          {
            "name": "Arginase (U/L)",
            "value": "1.0 - 30.0"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "22.29 - 68.71"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "14.66 - 309.80"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "3.91 - 18.78"
          },
          {
            "name": "LDH (U/L)",
            "value": "186.72 - 917.43"
          }
        ]
      },
      {
        "name": "Hormonal Parameters",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": "20-150"
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": "5-25"
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": "30-300"
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": "10-150"
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": "20-100"
          },
          {
            "name": "CORTISOL (µg/dL)",
            "value": "1-3"
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": "10-40"
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "ERYTHROPOIETIN (mIU/mL)",
            "value": "5-50"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "5-25"
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": "50-300"
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": "2-10"
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": "10-200"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "5-35"
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": "2-15"
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": "0.1-10"
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": "10-80"
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": "5-300"
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "OXYTOXIN (µU/mL)",
            "value": "1-10"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": "5-50"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "5-40"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "5-100"
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": "10-500"
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": "5-50"
          },
          {
            "name": "RENIN (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": "200-500"
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": "10-60"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "2-10"
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": "0.5-10"
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": "0.1-2"
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "2-5"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "100-300"
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": "1-12"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "0 - 3.5"
          },
          {
            "name": "Eosinophils",
            "value": "2 - 14"
          },
          {
            "name": "Lymphocytes",
            "value": "26 - 75"
          },
          {
            "name": "Monocytes",
            "value": "1 - 11"
          },
          {
            "name": "Neutrophils",
            "value": "13 - 54"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "1 : 2"
          }
        ]
      }
    ]
  },
  {
    "name": "Dog",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "110/60 -160/90"
          },
          {
            "name": "Mean blood pressure (mmHg)",
            "value": "85 - 120 mm Hg"
          },
          {
            "name": "Heart rate (beats per minute)",
            "value": "60 - 160"
          },
          {
            "name": "Pulse Rate",
            "value": "90-100/min"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "100.9-101.7°F"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "15-30/min"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "200 mL"
          },
          {
            "name": "Catheter site for BP (artery)",
            "value": "Femoral and carotid"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "7.2 - 8"
          },
          {
            "name": "Coagulation time ( in minutes)",
            "value": "1 minute 11 seconds"
          },
          {
            "name": "ESR (mm/h)",
            "value": "0 - 6"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "12 - 18"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "37 - 55"
          },
          {
            "name": "MCH (pg)",
            "value": "19.5 - 24.5"
          },
          {
            "name": "MCHC (%)",
            "value": "32 -36"
          },
          {
            "name": "MCV (fL)",
            "value": "60 - 77"
          },
          {
            "name": "pH",
            "value": "7.31 - 7.42"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "2 - 5"
          },
          {
            "name": "Specific gravity",
            "value": "1.052"
          },
          {
            "name": "TEC (million/µL)",
            "value": "5.5 - 8.5"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "6.0 - 17.0"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "120"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Cephalic, saphenous or Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "0.75-2.50 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": ""
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL)",
            "value": "2.6 - 3.3"
          },
          {
            "name": "A/G ratio",
            "value": "0.59 - 1.11"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": "18.0 - 24.0"
          },
          {
            "name": "Bile Acid (Total); TBA (µmol/L)",
            "value": "0.0 - 5.0"
          },
          {
            "name": "Bilirubin (Conjugated; CB) (mg/dL)",
            "value": "0.06 - 0.12"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.10 - 0.50"
          },
          {
            "name": "Bilirubin (Unconjugated; UCB) (mg/dL)",
            "value": "0.01 - 0.49"
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "10.0 - 28.0"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "9.0 - 11.3"
          },
          {
            "name": "Carbon dioxide (Total); TCO2",
            "value": "17.0 - 24.0"
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "105.0 - 115.0"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "135.0 - 270.0"
          },
          {
            "name": "Copper (µg/dL)",
            "value": "100.0 - 200.0"
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "0.5 - 1.5"
          },
          {
            "name": "Fibrinogen (g/dL)",
            "value": "200.0 - 400.0"
          },
          {
            "name": "Globulin (g/dL)",
            "value": "2.7 - 4.4"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "65.0 - 118.0"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": ""
          },
          {
            "name": "Icteric Index (Unit)",
            "value": "2.0 - 5.0"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "30.0 - 180.0"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": "2.0 - 13.0"
          },
          {
            "name": "Lead (µg/dL)",
            "value": ""
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "1.8 - 2.4"
          },
          {
            "name": "iPhosphorus (mg/dL)",
            "value": "2.6 - 6.2"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "4.37 - 5.35"
          },
          {
            "name": "Protein (Total) (g/dL)",
            "value": "5.4 - 7.1"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "141.0 - 152.0"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "20.0 - 112.0"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "0.0 - 2.0"
          }
        ]
      },
      {
        "name": "Hormonal parameters",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": "10-80"
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": "5-30"
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": "40-400"
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": "10-30"
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": "10-30"
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": "10-100"
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": ""
          },
          {
            "name": "CORTISOL (µg/dL)",
            "value": "1-6"
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": "50-200"
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": "50-150"
          },
          {
            "name": "ERYTHROPOIETIN (mU/mL)",
            "value": "5-25"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "20-80"
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": "50-200"
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": "50-150"
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": "1-5"
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": "10-100"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "5-25"
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": "100-400"
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": "50-200"
          },
          {
            "name": "OXYTOXIN (µU/mL)",
            "value": "1-5"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "10-80"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "2-20"
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": "10-200"
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": "10-100"
          },
          {
            "name": "RENIN (ng/mL)",
            "value": "0.5-5"
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": "150-300"
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "0.5-5"
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": "0.5-5"
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": "0.03-0.6"
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "1-4"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "50-150"
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": "1-10"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "20.0 - 156.0"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "21.0 - 102.0"
          },
          {
            "name": "Arginase (U/L)",
            "value": "0 - 14"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "23.0 - 66.0"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "1.15 - 28.40"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "1.2 - 6.4"
          },
          {
            "name": "LDH (U/L)",
            "value": "45.0 - 233.0"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "-"
          },
          {
            "name": "Eosinophils",
            "value": "2 - 10"
          },
          {
            "name": "Lymphocytes",
            "value": "12 - 30"
          },
          {
            "name": "Monocytes",
            "value": "3 - 10"
          },
          {
            "name": "Neutrophils",
            "value": "60 - 77"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "70 : 20"
          }
        ]
      }
    ]
  },
  {
    "name": "Fowl",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "135/120"
          },
          {
            "name": "Mean blood pressure",
            "value": "108 - 250"
          },
          {
            "name": "Heart Rate (beats per minute)",
            "value": "250 - 300"
          },
          {
            "name": "Pulse rate per minute",
            "value": "130-160/min"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "105.8-107.6°F"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "20-40/min"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "Female 31 and Male 46"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "6.0 - 7.5"
          },
          {
            "name": "Coagulation time (in minutes)",
            "value": "12 seconds - 1.0 minute"
          },
          {
            "name": "ESR (mm/h)",
            "value": "3.0 - 12.0"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "7.0 - 13.0"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "22.0 - 35.0"
          },
          {
            "name": "MCH (pg)",
            "value": "33.0 - 47.0"
          },
          {
            "name": "MCHC (%)",
            "value": "26.0 - 35.0"
          },
          {
            "name": "MCV (fL)",
            "value": "90.0 - 140.0"
          },
          {
            "name": "pH",
            "value": "7.1 - 7.7"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "0.2-0.4"
          },
          {
            "name": "Specific gravity",
            "value": "1.0421 - 1.0459"
          },
          {
            "name": "TEC (millions/µL)",
            "value": "2.5 - 3.5"
          },
          {
            "name": "TLC (thousands/µL)",
            "value": "12.0 - 30.0"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "20 - 35"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Wing, cutaneous, ulnar and brachial veins"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "1.24 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": ""
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL)",
            "value": "1.6 - 2.0"
          },
          {
            "name": "A/G ratio",
            "value": ""
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": ""
          },
          {
            "name": "Bile Acid (Total); TBA (µmol/L)",
            "value": ""
          },
          {
            "name": "Bilirubin (Conjugated; CB) (mg/dL)",
            "value": ""
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.39 - 0.41"
          },
          {
            "name": "Bilirubin (Unconjugated; UCB) (mg/dL)",
            "value": ""
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "0.4 - 1.0"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "4.5 - 6.0"
          },
          {
            "name": "Carbon dioxide (Total); TCO2",
            "value": ""
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "119.0 - 130.0"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "125.0 - 200.0"
          },
          {
            "name": "Copper (µg/dL)",
            "value": ""
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.0 - 2.0"
          },
          {
            "name": "Fibrinogen (g/dL)",
            "value": ""
          },
          {
            "name": "Globulin (g/dL)",
            "value": "2.3 - 3.0"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "130.0 - 270.0"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": ""
          },
          {
            "name": "Icteric Index (Unit)",
            "value": "2-5"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "99.5"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": ""
          },
          {
            "name": "Lead (µg/dL)",
            "value": ""
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "2.31 - 3.62"
          },
          {
            "name": "iPhosphorus (mg/dL)",
            "value": "3.0 - 6.0"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "4.6 - 4.7"
          },
          {
            "name": "Protein (Total) (g/dL)",
            "value": "4.0 - 5.2"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "151.0 - 161.0"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "100.88 - 122.12"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": ""
          }
        ]
      },
      {
        "name": "Meat Composition (Lean) (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "73-75"
          },
          {
            "name": "Protein",
            "value": "20-23"
          },
          {
            "name": "Lipid",
            "value": "4.7"
          },
          {
            "name": "Ash",
            "value": "1.0"
          }
        ]
      },
      {
        "name": "Chicken Egg Chemical Composition (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "65.5"
          },
          {
            "name": "Protein",
            "value": "11.8"
          },
          {
            "name": "Fat",
            "value": "11.0"
          },
          {
            "name": "Ash",
            "value": "11.7"
          },
          {
            "name": "Cholesterol content",
            "value": "230 mg/egg"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "482.05"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "5.8"
          },
          {
            "name": "Arginase (U/L)",
            "value": ""
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "252.0 - 401.0"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "1655.0 - 4246.0"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "0 - 1"
          },
          {
            "name": "LDH (U/L)",
            "value": "636.0"
          }
        ]
      },
      {
        "name": "Hormonal Parameters",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": ""
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": ""
          },
          {
            "name": "ALDOSTERONE (nmol/L)",
            "value": "0.06-0.07 nmol/L"
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": ""
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": ""
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": ""
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": ""
          },
          {
            "name": "CORTICOSTERONE (nmol/L)",
            "value": "5-34 nmol/L"
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": ""
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": ""
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": ""
          },
          {
            "name": "ERYTHROPOIETIN (mIU/mL)",
            "value": ""
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": ""
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (pg/mL)",
            "value": "869.005 ± 149.194 pg/mL in hens that lay eggs every day"
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": ""
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": ""
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": ""
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": ""
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": ""
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": ""
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": ""
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (mIU/mL)",
            "value": "51.386 ± 2.410 mIU/mL in hens that lay eggs every 2 days"
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": ""
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": ""
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": ""
          },
          {
            "name": "ARGININE VASOTOCIN (pmol/L)",
            "value": "basal concentration 3.30 pmol/L ; during oviposition 14.80 pmol/L"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": ""
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": ""
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "12.1 ng/mL for an out-of-lay hen to 1609.8 ng/mL for an incubating hen"
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": ""
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": ""
          },
          {
            "name": "RENIN (ng/mL)",
            "value": ""
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": ""
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": ""
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": ""
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": ""
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": ""
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "24.0- 38.0 nmol/L at day 42 of life"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (nmol/L)",
            "value": "1.8 - 3.9 nmol/L at day 42 of life"
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": ""
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "-"
          },
          {
            "name": "Eosinophils",
            "value": "1.5 - 6.0"
          },
          {
            "name": "Lymphocytes",
            "value": "45 - 70"
          },
          {
            "name": "Monocytes",
            "value": "5 - 10"
          },
          {
            "name": "Neutrophils",
            "value": "15 - 40"
          },
          {
            "name": "Heterophil: Lymphocyte Ratio",
            "value": "0.33-0.5 : 1.0"
          }
        ]
      }
    ]
  },
  {
    "name": "Goat",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "90-120/60-80"
          },
          {
            "name": "Mean blood pressure",
            "value": "75 - 100"
          },
          {
            "name": "Heart rate per minute",
            "value": "70 - 80"
          },
          {
            "name": "Pulse Rate per minute",
            "value": "70 - 80"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "100.8 - 103.8"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "12 - 20"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "750"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "7.6"
          },
          {
            "name": "Coagulation time",
            "value": "2 minutes"
          },
          {
            "name": "ESR (mm/h)",
            "value": "0"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "8.0 - 18.0"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "22 - 38"
          },
          {
            "name": "MCH (pg)",
            "value": "5.2 - 8.0"
          },
          {
            "name": "MCHC (%)",
            "value": "30 - 36"
          },
          {
            "name": "MCV (fL)",
            "value": "16 - 25"
          },
          {
            "name": "pH",
            "value": "7.35 - 7.40"
          },
          {
            "name": "Platelets (lakhs/µL)",
            "value": "3.0 - 6.0 thousand/mL"
          },
          {
            "name": "Specific gravity",
            "value": "1.058"
          },
          {
            "name": "TEC (million/µL)",
            "value": "8.0 - 18.0"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "4.0 - 13.0"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "125"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "0.69 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": ""
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL)",
            "value": "2.7 - 3.9"
          },
          {
            "name": "A/G ratio",
            "value": "6.3 - 12.6"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": ""
          },
          {
            "name": "Bile Acid (Total); TBA (µmol/L)",
            "value": ""
          },
          {
            "name": "Bilirubin (Conjugated; CB) (mg/dL)",
            "value": "0.0 - 0.37"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.0 - 0.8"
          },
          {
            "name": "Bilirubin (Unconjugated; UCB) (mg/dL)",
            "value": "0.0 - 0.33"
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "10.0 - 20.0"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "8.9 - 11.7"
          },
          {
            "name": "Carbon dioxide (Total); TCO2",
            "value": "25.6 - 29.6"
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "99.0 - 110.3"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "80.0 - 130.0"
          },
          {
            "name": "Copper (µg/dL)",
            "value": ""
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.0 - 1.8"
          },
          {
            "name": "Fibrinogen (g/dL)",
            "value": "1.0 - 4.0"
          },
          {
            "name": "Globulin (g/dL)",
            "value": "2.7 - 4.1"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "50.0 - 75.0"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": ""
          },
          {
            "name": "Icteric Index (Unit)",
            "value": "2.0 - 5.0"
          },
          {
            "name": "Iron (µg/dL)",
            "value": ""
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": ""
          },
          {
            "name": "Lead (µg/dL)",
            "value": "5.0 - 25.0"
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "2.8 - 3.6"
          },
          {
            "name": "iPhosphorus (mg/dL)",
            "value": "4.2 - 9.1"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "3.5 - 6.7"
          },
          {
            "name": "Protein (Total) (g/dL)",
            "value": "6.4 - 7.0"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "142.0 - 155.0"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "15.71 -84.90"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "0.3 - 1.0"
          }
        ]
      },
      {
        "name": "Milk composition (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "86.5"
          },
          {
            "name": "Fat",
            "value": "4.5"
          },
          {
            "name": "Protein",
            "value": "3.5"
          },
          {
            "name": "Lactose",
            "value": "4.7"
          },
          {
            "name": "Ash",
            "value": "0.8"
          }
        ]
      },
      {
        "name": "Meat Composition (Lean) (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "74.2"
          },
          {
            "name": "Protein",
            "value": "21.4"
          },
          {
            "name": "Lipid",
            "value": "3.6"
          },
          {
            "name": "Ash",
            "value": "1.1"
          }
        ]
      },
      {
        "name": "Hormonal Parameter",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": "5-25"
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": "30-250"
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": "10-100"
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": "20-100"
          },
          {
            "name": "CORTISOL (µg/dL)",
            "value": "0.5-2"
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": "20-60"
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "ERYTHROPOIETIN (mU/mL)",
            "value": "5-30"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "10-25"
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (ng/mL)",
            "value": "1-6"
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": "50-200"
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": "80-200"
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": "1-5"
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": "10-100"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "5-30"
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": "2-15"
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": "1-8"
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": "10-80"
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": "50-300"
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "OXYTOXIN (µU/mL)",
            "value": "1-8"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": "5-50"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "5-40"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "5-80"
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": "10-300"
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": "5-30"
          },
          {
            "name": "RENIN (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": "200-400"
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "4-12"
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": "0.5-10"
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": "0.1-2"
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "2-5"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "100-250"
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": "1-10"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "93 - 387"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "6 - 19"
          },
          {
            "name": "Arginase (U/L)",
            "value": "9-10"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "167 - 513"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "14 - 62"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "20 - 56"
          },
          {
            "name": "LDH (U/L)",
            "value": "88 - 487"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "0 - 1"
          },
          {
            "name": "Eosinophils",
            "value": "1 - 8"
          },
          {
            "name": "Lymphocytes",
            "value": "50 - 70"
          },
          {
            "name": "Monocytes",
            "value": "0 - 4"
          },
          {
            "name": "Neutrophils",
            "value": "30 - 48"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "30:70"
          }
        ]
      }
    ]
  },
  {
    "name": "Camel",
    "categories": [
      {
        "name": "Milk composition (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "86.5"
          },
          {
            "name": "Fat",
            "value": "3.1"
          },
          {
            "name": "Protein",
            "value": "4.0"
          },
          {
            "name": "Lactose",
            "value": "5.6"
          },
          {
            "name": "Ash",
            "value": "0.8"
          }
        ]
      },
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": ""
          },
          {
            "name": "Mean blood pressure",
            "value": ""
          },
          {
            "name": "Heart Rate per minute",
            "value": "50"
          },
          {
            "name": "Pulse rate per minute",
            "value": "120"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "95 - 101.4"
          },
          {
            "name": "Respiration Rate (breaths per minute)",
            "value": "10 - 30"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "3000 - 10000"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "8.3"
          },
          {
            "name": "Coagulation time (in minutes)",
            "value": ""
          },
          {
            "name": "ESR (mm/h)",
            "value": "2.2"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "9.26"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "21.0"
          },
          {
            "name": "MCH (pg)",
            "value": "18.1"
          },
          {
            "name": "MCHC (%)",
            "value": "42 - 50"
          },
          {
            "name": "MCV (fL)",
            "value": "40 - 41"
          },
          {
            "name": "pH",
            "value": "7.54"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "4.0"
          },
          {
            "name": "Specific gravity",
            "value": ""
          },
          {
            "name": "TEC (million/µL)",
            "value": "5.14"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "10.42"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "90 - 120"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "1.21 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": ""
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL )",
            "value": "3.0 - 4.4"
          },
          {
            "name": "A / G ratio",
            "value": ""
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": ""
          },
          {
            "name": "Bile acid, total (TBA) (µmol/L)",
            "value": ""
          },
          {
            "name": "Bilirubin (Conjugated); CB (mg/dL)",
            "value": ""
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.2 - 0.8"
          },
          {
            "name": "Bilirubin (Unconjugated); UCB (mg/dL)",
            "value": ""
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "16 -49"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "7 - 10"
          },
          {
            "name": "Carbon dioxide (TCO2)",
            "value": ""
          },
          {
            "name": "Chloride (mEq/L)",
            "value": ""
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": ""
          },
          {
            "name": "Copper (µg/dL)",
            "value": ""
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.2 - 2.8"
          },
          {
            "name": "Fibrinogen (g/dL )",
            "value": "200 - 400"
          },
          {
            "name": "Globulin (g/dL )",
            "value": "2.8 - 4.4"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "37 - 67"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": ""
          },
          {
            "name": "Icteric Index",
            "value": ""
          },
          {
            "name": "Iron (µg/dL)",
            "value": "62 - 133"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": ""
          },
          {
            "name": "Lead (µg/dL)",
            "value": ""
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "1.8 - 2.9"
          },
          {
            "name": "Phosphorus (mg/dL)",
            "value": ""
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "3.6 - 6.1"
          },
          {
            "name": "Protein (Total) (g/dL )",
            "value": "6.3 - 8.7"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "129 - 161"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": ""
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "0.19 - 0.61"
          }
        ]
      },
      {
        "name": "Hormonal Parameter",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": "10-50 pg/mL"
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": ""
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": ""
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": ""
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": ""
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": ""
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": ""
          },
          {
            "name": "CORTISOL (µg/dL)",
            "value": ""
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": ""
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": ""
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": ""
          },
          {
            "name": "ERYTHROPOIETIN (mIU/mL)",
            "value": ""
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "estrous cycle,  9–110 pg/mL ; early pregnancy 20 pg/mL ; Late pregnancy 606 pg/mL"
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (ng/mL)",
            "value": ""
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": ""
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": ""
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": "06-15 month -2.7 ng/mL ; 15m-10year -2.2 ng/mL"
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": ""
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": ""
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": ""
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": ""
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": ""
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": ""
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": ""
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": ""
          },
          {
            "name": "OXYTOXIN (µU/mL)",
            "value": ""
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": ""
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "During pregnancy, progesterone levels fluctuate between 4–5 ng/mL"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": ""
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": ""
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": ""
          },
          {
            "name": "RENIN (ng/mL)",
            "value": ""
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": ""
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": ""
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "pre- rut period (342.93±43.90 ng/dL) ; Onset of rut activity  (4213.94±278 ng/dL) ; post rut400.17±73.24 ng/dl"
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": ""
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": ""
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": ""
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": ""
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": ""
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "33 - 196"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": ""
          },
          {
            "name": "Arginase (U/L)",
            "value": ""
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "69 - 98"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "35 - 92"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": ""
          },
          {
            "name": "LDH (U/L)",
            "value": ""
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "0"
          },
          {
            "name": "Eosinophils",
            "value": "2.6"
          },
          {
            "name": "Lymphocytes",
            "value": "28.8"
          },
          {
            "name": "Monocytes",
            "value": "3.7"
          },
          {
            "name": "Neutrophils",
            "value": "55"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "55:28"
          }
        ]
      }
    ]
  },
  {
    "name": "Pig",
    "categories": [
      {
        "name": "Physiological parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "112/72 - 139/98"
          },
          {
            "name": "Mean blood pressure",
            "value": ""
          },
          {
            "name": "Heart Rate per minute",
            "value": "70 - 120"
          },
          {
            "name": "Pulse rate per minute",
            "value": "70 - 80"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "100.8 - 104.8"
          },
          {
            "name": "Respiration Rate (breaths per minute)",
            "value": "10 - 16"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "1000"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "6"
          },
          {
            "name": "Coagulation time (in minutes)",
            "value": "3.0"
          },
          {
            "name": "ESR (mm/h)",
            "value": "0.5"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "10 - 16"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "32 - 50"
          },
          {
            "name": "MCH (pg)",
            "value": "17 - 21"
          },
          {
            "name": "MCHC (%)",
            "value": "30 - 34"
          },
          {
            "name": "MCV (fL)",
            "value": "50 - 56"
          },
          {
            "name": "pH",
            "value": "7.306"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "1 - 9"
          },
          {
            "name": "Specific gravity",
            "value": "1.051"
          },
          {
            "name": "TEC (million/µL)",
            "value": "5 - 8"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "11 - 22"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "86 - 98"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Anterior vena cava, ear vein and external jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "1.77 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": ""
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL)",
            "value": "1.9 - 3.9"
          },
          {
            "name": "A/G ratio",
            "value": "3.7 - 5.1"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": "18.0 - 27.0"
          },
          {
            "name": "Bile Acid (Total); TBA (µmol/L)",
            "value": ""
          },
          {
            "name": "Bilirubin (conjugated; CB) (mg/dL)",
            "value": "0.0 - 0.3"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.0 - 1.0"
          },
          {
            "name": "Bilirubin (Unconjugated; UCB) (mg/dL)",
            "value": "0.0 - 0.3"
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "10.0 - 30.0"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "7.1 - 11.6"
          },
          {
            "name": "Carbon dioxide (Total); TCO2",
            "value": ""
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "94.0 - 106.0"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "36.0 - 54.0"
          },
          {
            "name": "Copper (µg/dL)",
            "value": "133.0 - 278.0"
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.1 - 2.5"
          },
          {
            "name": "Fibrinogen (g/dL)",
            "value": "1.0 - 5.0"
          },
          {
            "name": "Globulin (g/dL)",
            "value": "5.29 - 6.43"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "85.0 - 150.0"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": ""
          },
          {
            "name": "Icteric Index (Unit)",
            "value": "2.0 - 5.0"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "91.0 - 199.0"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": ""
          },
          {
            "name": "Lead (µg/dL)",
            "value": ""
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "2.7 - 3.7"
          },
          {
            "name": "iPhosphorus (mg/dL)",
            "value": "5.3 - 9.6"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "4.4 - 6.7"
          },
          {
            "name": "Protein (Total) (g/dL)",
            "value": "7.9 - 8.9"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "135.0 - 150.0"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "28.7 - 47.4"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": ""
          }
        ]
      },
      {
        "name": "Meat Composition (Lean) (%)",
        "parameters": [
          {
            "name": "Water",
            "value": "68-70"
          },
          {
            "name": "Protein",
            "value": "19-20"
          },
          {
            "name": "Lipid",
            "value": "9-11"
          },
          {
            "name": "Ash",
            "value": "1.4"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "118 - 395"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "31 - 58"
          },
          {
            "name": "Arginase (U/L)",
            "value": "0 - 14"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "32 - 84"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "2.4 - 22.5"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "10 - 60"
          },
          {
            "name": "LDH (U/L)",
            "value": "380 - 634"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "0 - 2"
          },
          {
            "name": "Eosinophils",
            "value": "1 - 11"
          },
          {
            "name": "Lymphocytes",
            "value": "39 - 62"
          },
          {
            "name": "Monocytes",
            "value": "2 - 10"
          },
          {
            "name": "Neutrophils",
            "value": "28 - 47"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "35:50"
          }
        ]
      },
      {
        "name": "Hormonal Parameter",
        "parameters": [
          {
            "name": "RELAXIN (ng/mL)",
            "value": "Non-pregnant: \u003C 2.0 ng/mL ;  Pregnant: 2.0-10.0 ng/mL"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "Non-pregnant: \u003C 1.0 ng/mL; Pregnant: 10.0-30.0 ng/mL"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "Non-pregnant: \u003C 10.0 pg/mL ; Pregnant: 10.0-50.0 pg/mL"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "Boars: 0.5-5.0 ng/mL ; Barrows (castrated males): \u003C 0.1 ng/mL"
          },
          {
            "name": "THYROXINE (T4) (ng/dL)",
            "value": "15.0-50.0 ng/mL"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "0.5-2.5 ng/mL"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "5.0-15.0 µIU/mL"
          }
        ]
      }
    ]
  },
  {
    "name": "Cat",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "108-120/79-87"
          },
          {
            "name": "Mean blood pressure",
            "value": "85 - 120"
          },
          {
            "name": "Heart Rate per minute",
            "value": "140 - 220"
          },
          {
            "name": "Pulse rate per minute",
            "value": "100 - 120"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "100.6 - 101.6"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "16 - 32"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "300"
          },
          {
            "name": "Catheter site for BP (artery)",
            "value": "Femoral and carotid"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "6 - 7"
          },
          {
            "name": "Coagulation time (in minutes)",
            "value": "1.0"
          },
          {
            "name": "ESR (mm/h)",
            "value": "6 - 25"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "8 - 15"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "24 - 45"
          },
          {
            "name": "MCH (pg)",
            "value": "12.5 -17.5"
          },
          {
            "name": "MCHC (%)",
            "value": "30 -36"
          },
          {
            "name": "MCV (fL)",
            "value": "39 - 55"
          },
          {
            "name": "pH",
            "value": "7.34 -7.43"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "3 - 8"
          },
          {
            "name": "Specific gravity",
            "value": "1.052"
          },
          {
            "name": "TEC (million/µL)",
            "value": "5 - 10"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "5.5 - 19.5"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "66 - 78"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Cephalic or Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "1.20-2.20 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": ""
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL)",
            "value": "2.1 - 3.3"
          },
          {
            "name": "A/G ratio",
            "value": "0.45 - 1.19"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": "17.0 - 21.0"
          },
          {
            "name": "Bile Acid; TBA (µmol/L)",
            "value": "0.0 - 5.0"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.15 - 0.50"
          },
          {
            "name": "Bilirubin (Unconjugated; UCB) (mg/dL)",
            "value": ""
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "20.0 - 30.0"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "6.2 - 10.2"
          },
          {
            "name": "Carbon dioxide (Total); TCO2",
            "value": "17.0 - 24.0"
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "117.0 - 123.0"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "95.0 - 130.0"
          },
          {
            "name": "Copper (µg/dL)",
            "value": ""
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "0.8 - 1.8"
          },
          {
            "name": "Fibrinogen (g/dL)",
            "value": "50.0 - 300.0"
          },
          {
            "name": "Globulin (g/dL)",
            "value": "2.6 - 5.1"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "73.0 - 134.0"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": "1.3 - 5.1"
          },
          {
            "name": "Icteric Index (Unit)",
            "value": "2.0 - 5.0"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "68.0 - 215.0"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": ""
          },
          {
            "name": "Lead (µg/dL)",
            "value": ""
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": ""
          },
          {
            "name": "iPhosphorus (mg/dL)",
            "value": "4.5 - 8.1"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "4.0 - 4.5"
          },
          {
            "name": "Protein (Total) (g/dL)",
            "value": "5.4 - 7.8"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "147.0 - 156.0"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "10.0 - 114.0"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "0.0 - 1.0"
          }
        ]
      },
      {
        "name": "Serum enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "23 - 93"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "6 - 83"
          },
          {
            "name": "Arginase (U/L)",
            "value": "0 - 14"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "26 - 43"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "7.2 - 28.2"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "1.3 - 5.1"
          },
          {
            "name": "LDH (U/L)",
            "value": "63 - 273"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "0 - 1"
          },
          {
            "name": "Eosinophils",
            "value": "2 - 12"
          },
          {
            "name": "Lymphocytes",
            "value": "20 - 55"
          },
          {
            "name": "Monocytes",
            "value": "1 - 4"
          },
          {
            "name": "Neutrophils",
            "value": "35 - 75"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "60 : 30"
          }
        ]
      },
      {
        "name": "Hormonal parameter",
        "parameters": [
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": "0.2-1.8 ng/mL in Queen and 3.0-10.0 ng/mL in Tom"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "1.0-6.0 ng/mL in Tom and \u003C 0.2 ng/mL in Queen"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "\u003C 0.1 ng/mL in Queen, anestrus or spayed and 10-40 ng/mL in Queen, diestrus day 15 ; \u003E1.87 ng/mL during luteal phase\u003E"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "PRL levels are higher during the dark period (31.7 ng/ml) than during the light period (5.5 ng/ml)"
          },
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pmol/litre)",
            "value": "1.1 -22 pmol/litre"
          },
          {
            "name": "ENDORPHINS (pmol/litre)",
            "value": "3.8-130 pmol/litre"
          },
          {
            "name": "α-MSH",
            "value": "3.6-200 pmol/litre"
          },
          {
            "name": "GROWTH HORMONE (GH) (µg/litre)",
            "value": "2.5-3.9 µg/litre"
          },
          {
            "name": "CORTISOL (nmol/litre)",
            "value": "5.0-140.0 nmol/litre"
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "0.8-3.8  µg/dL"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "15-104 ng/dL"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "10.0 pg/mL in interfollicular phase ; 60.0 pg/mL during folliculogenesis and during pregnancy 20-100 pg/mL"
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": "non-pregnant \u003C 2.0 ng/mL; Early gestation -2.0-10.0 ng/mL; Late  gestation -2.0-10.0 ng/mL"
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": "10.0-100.0 pg/mL"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "5.0-20.0 µIU/mL"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": "0-38.0 pg/mL"
          }
        ]
      }
    ]
  },
  {
    "name": "Horse",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "80/49 - 144/105"
          },
          {
            "name": "Mean blood pressure",
            "value": "50 - 60"
          },
          {
            "name": "Heart Rate per minute",
            "value": "28 -40"
          },
          {
            "name": "Pulse rate per minute",
            "value": "33 - 41"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "100.4 - 100.8"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "8 - 16"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "7200"
          },
          {
            "name": "Catheter site for BP (artery)",
            "value": "Coccygeal"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "7 - 8"
          },
          {
            "name": "Coagulation time (in minutes)",
            "value": "\u003C 11"
          },
          {
            "name": "ESR (mm/h)",
            "value": "8 / 20 minutes"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "11 - 19"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "32 - 53"
          },
          {
            "name": "MCH (pg)",
            "value": "12.3 - 19.7"
          },
          {
            "name": "MCHC (%)",
            "value": "31 - 37"
          },
          {
            "name": "MCV (fL)",
            "value": "37 - 59"
          },
          {
            "name": "pH",
            "value": "7.38 - 7.44"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "1.0 - 8.5"
          },
          {
            "name": "Specific gravity",
            "value": "1.058"
          },
          {
            "name": "TEC (million/µL)",
            "value": "6.8 - 12.9"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "5.5 - 14.3"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "140 - 150"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "0.5-1.5 :1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": "0 -10.0"
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL)",
            "value": "2.6 - 3.7"
          },
          {
            "name": "A/G ratio",
            "value": "6.2 - 14.6"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": "20.0 - 28.0"
          },
          {
            "name": "Bile Acid (Total); TBA (µmol/L)",
            "value": "5.0 - 28.0"
          },
          {
            "name": "Bilirubin (Conjugated; CB) (mg/dL)",
            "value": "0.0 - 0.4"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "1.0 - 2.0"
          },
          {
            "name": "Bilirubin (Unconjugated; UCB) (mg/dL)",
            "value": "0.2 - 2.0"
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "10.0 - 24.0"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "11.2 -13.6"
          },
          {
            "name": "Carbon dioxide (Total); TCO2",
            "value": "24.0 - 32.0"
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "99.0 - 109.0"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "75.0 - 150.0"
          },
          {
            "name": "Copper (µg/dL)",
            "value": ""
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.2 - 1.9"
          },
          {
            "name": "Fibrinogen (g/dL)",
            "value": "1.0 - 4.0"
          },
          {
            "name": "Globulin (g/dL)",
            "value": "2.62 - 4.04"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "45.0 - 75.0"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": ""
          },
          {
            "name": "Icteric Index (Unit)",
            "value": "5.0 -20..0"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "73.0 - 140.0"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": "10.0 - 16.0"
          },
          {
            "name": "Lead (µg/dL)",
            "value": "5.0 - 25.0"
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "2.2 - 2.8"
          },
          {
            "name": "iPhosphorus (mg/dL)",
            "value": "3.1 - 5.6"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "2.4 - 4.7"
          },
          {
            "name": "Protein (Total) (g/dL)",
            "value": "5.2 - 7.9"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "132.0 - 146.0"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": "4.0 - 44.0"
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "0.9 - 1.1"
          }
        ]
      },
      {
        "name": "Hormonal Parameter",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": "10-60"
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": "5-20"
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": "50-400"
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": "10-30"
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": "10-30"
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": "10-100"
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "CORTISOL (µg/dL)",
            "value": "2-10"
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": "50-200"
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": "30-120"
          },
          {
            "name": "ERYTHROPOIETIN (mU/mL)",
            "value": "10-50"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "30-100"
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": "50-150"
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": "50-150"
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": "0.5-6"
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": "10-150"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "2-20"
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": "2-10"
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": "20-80"
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": "1-20"
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": "20-90"
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": "100-500"
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": "50-200"
          },
          {
            "name": "OXYTOXIN (µU/mL)",
            "value": "1-5"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": "10-60"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "10-40"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "5-25"
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": "10-200"
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": "10-50"
          },
          {
            "name": "RENIN (ng/mL)",
            "value": "0.5-5"
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": "150-300"
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "0.5-10"
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": "0.5-10"
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": "0.1-1"
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "1-3"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "30-90"
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": "1-10"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "143 - 395"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "3 - 23"
          },
          {
            "name": "Arginase (U/L)",
            "value": "0 - 14"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "226 - 366"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "2.4 - 23.4"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "4.3 - 13.4"
          },
          {
            "name": "LDH (U/L)",
            "value": "162 - 412"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "0 - 4"
          },
          {
            "name": "Eosinophils",
            "value": "0 - 10"
          },
          {
            "name": "Lymphocytes",
            "value": "17 - 68"
          },
          {
            "name": "Monocytes",
            "value": "0 - 7"
          },
          {
            "name": "Neutrophils",
            "value": "22 - 72"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "cold blooded- 55:35; hot blooded- 50:45"
          }
        ]
      }
    ]
  },
  {
    "name": "Sheep",
    "categories": [
      {
        "name": "Physiological Parameters",
        "parameters": [
          {
            "name": "Arterial blood pressure (mmHg) systole/diastole",
            "value": "90/60 - 120/80"
          },
          {
            "name": "Mean blood pressure",
            "value": "75 - 100"
          },
          {
            "name": "Heart Rate (beats per minute)",
            "value": "70 - 80"
          },
          {
            "name": "Pulse rate per minute",
            "value": "70 - 80"
          },
          {
            "name": "Rectal temperature (°F)",
            "value": "101.2 - 105.8"
          },
          {
            "name": "Respiration Rate per minute",
            "value": "12 - 20"
          },
          {
            "name": "Tidal volume (mL)",
            "value": "360"
          }
        ]
      },
      {
        "name": "Haematological Parameters",
        "parameters": [
          {
            "name": "Blood volume (%)",
            "value": "8"
          },
          {
            "name": "Coagulation time (in minutes)",
            "value": "2.5"
          },
          {
            "name": "ESR (mm/h)",
            "value": "0"
          },
          {
            "name": "Haemoglobin (g/dL)",
            "value": "9 - 15"
          },
          {
            "name": "HCT/PCV (%)",
            "value": "27 - 45"
          },
          {
            "name": "MCH (pg)",
            "value": "8 - 12"
          },
          {
            "name": "MCHC (%)",
            "value": "31 - 34"
          },
          {
            "name": "MCV (fL)",
            "value": "28 - 40"
          },
          {
            "name": "pH",
            "value": "7.30 - 7.48"
          },
          {
            "name": "Platelets (Lakhs/µL)",
            "value": "2.5 - 7.5"
          },
          {
            "name": "Specific gravity",
            "value": "1.058"
          },
          {
            "name": "TEC (million/µL)",
            "value": "9 - 15"
          },
          {
            "name": "TLC (thousand/µL)",
            "value": "4 - 12"
          },
          {
            "name": "Life span of RBC (in days)",
            "value": "140 - 150"
          },
          {
            "name": "Site of blood collection (vein)",
            "value": "Jugular vein"
          },
          {
            "name": "Myeloid : Erythroid ratio",
            "value": "1.1 : 1.0"
          }
        ]
      },
      {
        "name": "Blood Biochemical",
        "parameters": [
          {
            "name": "Acetone",
            "value": ""
          },
          {
            "name": "Acetoacetate (mmol/L)",
            "value": ""
          },
          {
            "name": "Albumin (g/dL)",
            "value": "2.4 - 3.0"
          },
          {
            "name": "A/G ratio",
            "value": "4.2 - 7.6"
          },
          {
            "name": "Bicarbonate (mmol/L)",
            "value": "20.0 - 25.0"
          },
          {
            "name": "Bile Acid (Total); TBA (µmol/L)",
            "value": ""
          },
          {
            "name": "Bilirubin (Conjugated; CB) (mg/dL)",
            "value": "0.0 - 0.27"
          },
          {
            "name": "Bilirubin (Total) (mg/dL)",
            "value": "0.1 - 0.5"
          },
          {
            "name": "Bilirubin (Unconjugated; UCB) (mg/dL)",
            "value": "0.0 - 0.12"
          },
          {
            "name": "Blood Urea Nitrogen (BUN) (mg/dL)",
            "value": "8.0 - 20.0"
          },
          {
            "name": "Calcium (mg/dL)",
            "value": "11.5 - 12.8"
          },
          {
            "name": "Carbon dioxide (Total); TCO2",
            "value": "21.0 - 28.0"
          },
          {
            "name": "Chloride (mEq/L)",
            "value": "95.0 - 103.0"
          },
          {
            "name": "Cholesterol (Total) (mg/dL)",
            "value": "52.0 - 76.0"
          },
          {
            "name": "Copper (µg/dL)",
            "value": "58.0 - 160.0"
          },
          {
            "name": "Creatinine (mg/dL)",
            "value": "1.2 - 1.9"
          },
          {
            "name": "Fibrinogen (g/dL)",
            "value": "1.0 - 5.0"
          },
          {
            "name": "Globulin (g/dL)",
            "value": "3.5 - 5.7"
          },
          {
            "name": "Glucose (mg/dL)",
            "value": "50.0 - 80.0"
          },
          {
            "name": "Glutathione (mg/dL)",
            "value": ""
          },
          {
            "name": "Icteric Index (Unit)",
            "value": "2.0 - 5.0"
          },
          {
            "name": "Iron (µg/dL)",
            "value": "166.0 - 222.0"
          },
          {
            "name": "Lactate (Lac) (mg/dL)",
            "value": "9.0 - 12.0"
          },
          {
            "name": "Lead (µg/dL)",
            "value": "5.0 - 25.0"
          },
          {
            "name": "Magnesium (mg/dL)",
            "value": "2.2 - 2.8"
          },
          {
            "name": "iPhosphorus (mg/dL)",
            "value": "5.0 - 7.3"
          },
          {
            "name": "Potassium (mEq/L)",
            "value": "3.9 - 5.4"
          },
          {
            "name": "Protein (Total) (g/dL)",
            "value": "6.0 - 7.9"
          },
          {
            "name": "Sodium (mEq/L)",
            "value": "139.0 - 152.0"
          },
          {
            "name": "Triglycerides (mg/dL)",
            "value": ""
          },
          {
            "name": "Uric acid (mg/dL)",
            "value": "0.0 - 1.9"
          }
        ]
      },
      {
        "name": "Hormonal Parameter",
        "parameters": [
          {
            "name": "ADRENOCORTICOTROPHIC HORMONE (ACTH) (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "ADIPONECTIN (µg/mL)",
            "value": "5-25"
          },
          {
            "name": "ALDOSTERONE (pg/mL)",
            "value": "50-250"
          },
          {
            "name": "ATRIAL NATRIURETIC PEPTIDE (ANP) (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CALCITONIN (pg/mL)",
            "value": "20-50"
          },
          {
            "name": "CHOLECYSTOKININ (CCK) (pg/mL)",
            "value": "10-100"
          },
          {
            "name": "CHORIONIC GONADOTROPHIN (ng/mL)",
            "value": "20-100"
          },
          {
            "name": "CORTISOL (µg/dL)",
            "value": "1-2"
          },
          {
            "name": "CORTICOTROPIN-RELEASING HORMONE (CRH) (pg/mL)",
            "value": "20-60"
          },
          {
            "name": "ENDORPHINS (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "EPINEPHRINE (ADRENALINE) (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "ERYTHROPOIETIN (mU/mL)",
            "value": "5-30"
          },
          {
            "name": "ESTROGEN (pg/mL)",
            "value": "5-15"
          },
          {
            "name": "FOLLICLE STIMULATING HORMONE (FSH) (ng/mL)",
            "value": "1-6"
          },
          {
            "name": "GHRELIN (pg/mL)",
            "value": "50-200"
          },
          {
            "name": "GLUCAGON (pg/mL)",
            "value": "80-200"
          },
          {
            "name": "GONADOTROPHIN RELEASING HORMONE (GnRH)",
            "value": ""
          },
          {
            "name": "GROWTH HORMONE (GH) (ng/mL)",
            "value": "1-6"
          },
          {
            "name": "INHIBIN (pg/mL)",
            "value": "10-100"
          },
          {
            "name": "INSULIN (µIU/mL)",
            "value": "5-30"
          },
          {
            "name": "LEPTIN (ng/mL)",
            "value": "2-15"
          },
          {
            "name": "LEUKOTRIENES (pg/mL)",
            "value": "20-100"
          },
          {
            "name": "LUTEINIZING HORMONE (LH) (ng/mL)",
            "value": "1-8"
          },
          {
            "name": "MELATONIN (pg/mL)",
            "value": "10-80"
          },
          {
            "name": "NOREPINEPHRINE (NORADRENALINE) (pg/mL)",
            "value": "50-300"
          },
          {
            "name": "NEUROPEPTIDE Y (NPY) (pg/mL)",
            "value": "100-300"
          },
          {
            "name": "OXYTOXIN (µU/mL)",
            "value": "1-8"
          },
          {
            "name": "PARATHYROID HORMONE (PTH) (pg/mL)",
            "value": "5-50"
          },
          {
            "name": "PROGESTERONE (ng/mL)",
            "value": "5-20"
          },
          {
            "name": "PROLACTIN (ng/mL)",
            "value": "5-80"
          },
          {
            "name": "PROSTAGLANDINS (pg/mL)",
            "value": "10-200"
          },
          {
            "name": "RELAXIN (ng/mL)",
            "value": "5-30"
          },
          {
            "name": "RENIN (ng/mL)",
            "value": "1-10"
          },
          {
            "name": "SEROTONIN (ng/mL)",
            "value": "200-400"
          },
          {
            "name": "SOMATOSTATIN (pg/mL)",
            "value": "10-50"
          },
          {
            "name": "TESTOSTERONE (ng/mL)",
            "value": "3-10"
          },
          {
            "name": "THROMBOXANES (ng/mL)",
            "value": "0.5-10"
          },
          {
            "name": "THYROID STIMULATING HORMONE (TSH) (ng/mL)",
            "value": "0.05-2"
          },
          {
            "name": "THYROXINE (T4) (µg/dL)",
            "value": "2-5"
          },
          {
            "name": "TRIIODOTHYRONINE (T3) (ng/dL)",
            "value": "100-250"
          },
          {
            "name": "VASOPRESSIN (ADH) (pg/mL)",
            "value": "1-10"
          }
        ]
      },
      {
        "name": "Serum Enzymes",
        "parameters": [
          {
            "name": "Alkaline Phosphatase (U/L)",
            "value": "68 - 387"
          },
          {
            "name": "ALT / SGPT (U/L)",
            "value": "26 - 34"
          },
          {
            "name": "Arginase (U/L)",
            "value": "0 - 14"
          },
          {
            "name": "AST / SGOT (U/L)",
            "value": "60 - 280"
          },
          {
            "name": "Creatinine Kinase (U/L)",
            "value": "8.1 - 12.9"
          },
          {
            "name": "Gammaglutamyltransferase (GGT) (U/L)",
            "value": "20 - 52"
          },
          {
            "name": "LDH (U/L)",
            "value": "238 - 440"
          }
        ]
      },
      {
        "name": "Differential Leukocyte count (%)",
        "parameters": [
          {
            "name": "Basophils",
            "value": "0 - 3"
          },
          {
            "name": "Eosinophils",
            "value": "0 - 10"
          },
          {
            "name": "Lymphocytes",
            "value": "40 - 75"
          },
          {
            "name": "Monocytes",
            "value": "0 - 6"
          },
          {
            "name": "Neutrophils",
            "value": "10 - 15"
          },
          {
            "name": "Neutrophil: Lymphocyte Ratio",
            "value": "30:60"
          }
        ]
      }
    ]
  }
];
