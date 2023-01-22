function SwitchButton({ label, onPress, pressed, htmlId, group }: { label: string, onPress: (value: string | null) => void, pressed: boolean, htmlId: string, group: string }) {
    return(
        <button onClick={() => onPress(label)} aria-pressed={pressed} id={"preference-button-" + group + "-" + htmlId}>{ label }</button>
    )
}

export default SwitchButton;