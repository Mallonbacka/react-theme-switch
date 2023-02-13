import React from 'react';

import Switch from './components/Switch';

function PreferencesPanel() {
  const options = {
    'settings': [
      {
        'key': 'color-scheme',
        'label': 'Color scheme',
        'options': {
          'Dark': 'dark',
          'Match system': 'default',
          'Light': 'light'
        }
      },
      {
        'key': 'contrast',
        'label': 'Contrast',
        'options': {
          'More': 'more',
          'Normal': 'default',
          'Less': 'less'
        }
      }
    ]
  }

  const [panelVisible, setPanelVisible] = React.useState(false);
  const [activeSettings, setActiveSettings] = React.useState(() => {
    const currentSettings: { [key: string]: string } = {};
    options.settings.forEach((setting) => {
      currentSettings[setting.key] = window.localStorage.getItem("display-override-" + setting.key) || "default";
      document.documentElement.setAttribute('data-override-' + setting.key, currentSettings[setting.key]);
    })

    return currentSettings;
  })

  React.useEffect(() => {
    for(const [key, value] of Object.entries(activeSettings)) {
      window.localStorage.setItem("display-override-" + key, String(value));
    }
  }, [activeSettings])

  function togglePanel() {
    setPanelVisible(!panelVisible);
  }

  function setActiveSetting(group: string, value: string) {
    setActiveSettings({...(Object(activeSettings)), [group]: value});
  }

  function addClassToBody(group: string, classToAdd: string, classesToRemove?: string[]) {
    document.documentElement.setAttribute('data-override-' + group, classToAdd);
    setActiveSetting(group, classToAdd);
  }

  function switches() {
    return options.settings.map((setting) => {
      return <Switch key={setting.key} group={setting.key} label={setting.label} options={Object(setting.options)} onChange={addClassToBody} activeSetting={activeSettings[setting.key]} />
    })
  }

  return (
    <>
      <button onClick={togglePanel} aria-expanded={panelVisible} aria-controls='preferences-panel' className='preferences-toggle-button'>Page options <span className="caret" aria-hidden={true}></span></button>
      {panelVisible && <div className='switch-container' id='preferences-panel'>
        { switches() }
      </div> }
    </>
  );
}

export default PreferencesPanel;
