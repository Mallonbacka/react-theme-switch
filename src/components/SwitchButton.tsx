function SwitchButton({ label, onPress, pressed, htmlId, group }: { label: string, onPress: (value: string) => void, pressed: boolean, htmlId: string, group: string }) {
    return(
        <button onClick={() => onPress(label)} aria-pressed={pressed} id={"preference-button-" + group + "-" + htmlId} type="button">{ label }</button>
    )
}

export default SwitchButton;