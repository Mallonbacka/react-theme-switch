import React from "react";

import SwitchButton from "./SwitchButton";

function Switch({ group, label, options, onChange, activeSetting }: { group: string, label: string, options: { [key: string]: string | null }, onChange: (group: string, newClass: string | null, removedClasses: string[]) => void, activeSetting: string | null }) {
    const [currentValue, setCurrentValue] = React.useState<string | null>(activeSetting);

    const onPress = (newStyle: string | null) => {
        const newClass = newStyle ? options[newStyle] : null;
        const removedClasses = Object
            .values(options)
            .filter((value): value is string => value !== null)
            .filter((value) => value !== newClass);
        onChange(group, newClass, removedClasses);
        setCurrentValue(newClass);
    }

    const buttons = Object.keys(options).map((button_label) => {
        return <SwitchButton label={ button_label } htmlId={options[button_label] || 'default'} key={ options[button_label] } onPress={onPress} pressed={ currentValue === options[button_label] } group={group} />
    });

    return(
        <div className="switch-group">
            <span className="switch-label">{ label }: </span>
            <div className="button-container">
                { buttons }
            </div>
        </div>
    )
}

export default Switch;