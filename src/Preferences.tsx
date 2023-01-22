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
          'Match system': null,
          'Light': 'light'
        }
      },
      {
        'key': 'contrast',
        'label': 'Contrast',
        'options': {
          'More': 'more',
          'Normal': null,
          'Less': 'less'
        }
      }
    ]
  }

  const [panelVisible, setPanelVisible] = React.useState(false);
  const [activeSettings, setActiveSettings] = React.useState(() => {
    const storagePreferences = window.localStorage.getItem("displayPreferences");

    if (storagePreferences){
      const parsedPreferences = JSON.parse(storagePreferences);
      for (const [, value] of Object.entries(parsedPreferences)) { /* eslint-disable-line no-unused-vars */
        if(value){
          document.documentElement.classList.add(String(value));
        }
      }
      return Object(parsedPreferences);
    }

    const settings: { [key: string]: string | null } = {};
    options.settings.forEach((setting) => {
      settings[setting.key] = null;
    });
    return settings;
  })

  React.useEffect(() => {
    window.localStorage.setItem("displayPreferences", JSON.stringify(activeSettings));
  }, [activeSettings])

  function togglePanel() {
    setPanelVisible(!panelVisible);
  }

  function setActiveSetting(group: string, value: string | null) {
    setActiveSettings({...(Object(activeSettings)), [group]: value});
  }

  function addClassToBody(group: string, classToAdd: string | null, classesToRemove: string[]) {
    if(activeSettings[group]){
      document.documentElement.classList.remove(String(activeSettings[group]));
    }
    setActiveSetting(group, classToAdd);
    if (classToAdd) {
      document.documentElement.classList.add(classToAdd);
    }
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
