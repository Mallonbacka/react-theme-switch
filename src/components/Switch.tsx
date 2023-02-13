import React from "react";

import SwitchButton from "./SwitchButton";

function Switch({ group, label, options, onChange, activeSetting }: { group: string, label: string, options: { [key: string]: string }, onChange: (group: string, newClass: string ) => void, activeSetting: string }) {
    const [currentValue, setCurrentValue] = React.useState<string>(activeSetting);

    const onPress = (newStyle: string) => {
        const newClass = options[newStyle];
        onChange(group, newClass);
        setCurrentValue(newClass);
    }

    const buttons = Object.keys(options).map((button_label) => {
        return <SwitchButton label={ button_label } htmlId={options[button_label]} key={ options[button_label] } onPress={onPress} pressed={ currentValue === options[button_label] } group={group} />
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