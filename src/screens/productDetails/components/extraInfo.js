import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import Accordion from 'react-native-collapsible/Accordion';
import { useDimensionContext } from "../../../context";
import Style from "./style";
import color from "../../../components/common/color";

const ExtraInfo = () => {
    const dimensions = useDimensionContext();
    const responsiveStyle = Style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait
    );
    const route = useRoute();
    const { product } = route.params;
    const [activeSections, setActiveSections] = useState([]);

    const SECTIONS = [
        {
            title: 'Manufacture Details',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        },
        {
            title: 'Product Disclaimer',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        },
        {
            title: 'Fetures and Details',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        },
    ];

    const renderHeader = (section, index, isActive) => {
        return (
            <View style={responsiveStyle.extraheader}>
                <Text style={responsiveStyle.extraheaderText}>{section.title}</Text>
                <Image style={responsiveStyle.viewTwoImage} source={require('../../../assets/images/arrowDown.png')} />
            </View>
        );
    };

    const renderContent = (section) => {
        return (
            <View style={responsiveStyle.extraContent}>
                <Text  style={responsiveStyle.extraContentText}>{section.content}</Text>
            </View>
        );
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <View style={responsiveStyle.container}>
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                sectionContainerStyle={{
                    paddingVertical:10,
                    borderBottomColor:color.black,
                    borderBottomWidth:1
                }}
            />
        </View>
    );
};

export default ExtraInfo;
