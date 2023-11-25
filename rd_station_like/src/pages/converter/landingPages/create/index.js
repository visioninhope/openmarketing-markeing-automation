import { useEffect, useState } from "react";
import "../../../../assets/css/mainCreateRender.css";
import LPMenuRender from "../../../../components/LP/LPMenuRender";
import LPRender from "../../../../components/LP/LPRender";
import LPToolRender from "../../../../components/LP/LPToolRender";
import TestTemplate from "../../../../constants/LPTemplateDefault";
import TestTemplateMobile from "../../../../constants/LPTemplateDefaultMobile";
import { KEY_TYPES } from "../../../../constants/LpContants";
import comum from "../../../../helpers/comum";

function CreateLandingPage() {
  // Esses são os SCRIPTS que devem ser mandados ao Backend
  const [desktopScript, setDesktopScript] = useState(TestTemplate());
  const [mobileScript, setMobileScript] = useState(TestTemplateMobile());

  // Só pode ser alterada pelo handleScript().
  const [isMobile, _setIsMobile] = useState(false);

  // Esse script é só para exebição.
  const [script, setScriptMain] = useState(desktopScript);

  // Auxiliares para o funcionamento do sistema.
  const [sectionActive, setSectionActive] = useState(null); //ID
  const [elementActive, setElementActive] = useState(null); //ID
  const [activeSectionValues, setActiveSectionValues] = useState(null);
  const [activeElementValues, setActiveElementsValues] = useState(null);

  useEffect(() => {
    setActiveSectionValues(getValueSectionActive());
    setActiveElementsValues(getValueElementActive());
  }, [script, elementActive, sectionActive]);

  function setScript(e) {
    if (isMobile) setMobileScript(e);
    else setDesktopScript(e);
    setScriptMain(e);
  }

  function handleScript() {
    const to = !isMobile;
    _setIsMobile(to);
    setScriptMain(to ? mobileScript : desktopScript);
  }

  function getValueElementActive() {
    if (!elementActive) return "";

    const activeSec = getValueSectionActive();
    const finl = activeSec?.items?.find((e) => e.id === elementActive);
    return finl || "";
  }

  function addNewSection() {
    const newoj = {
      id: comum.GenerateId().toString(),
      styles: {
        backgroundSectionColor: "#006bb3",
        sectionOpacity: 100,
        height: 200,
      },
      items: [],
    };

    setScript({
      ...script,
      properties: [...script.properties, newoj],
    });
  }

  function updateProperties(newProp, id) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (id === i.id) {
          return {
            ...i,
            items: newProp,
          };
        }
        return i;
      }),
    });
  }

  function deleteElement(propId, elementId) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (propId === i.id) {
          return {
            ...i,
            items: i.items.filter((e) => {
              if (elementId != e.id) {
                return e;
              }
            }),
          };
        }
        return i;
      }),
    });
  }

  function updateSectionStyles(key, value) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (sectionActive === i.id) {
          return {
            ...i,
            styles: {
              ...i.styles,
              [key]: value,
            },
          };
        }
        return i;
      }),
    });
  }

  function getValueSectionActive() {
    if (!sectionActive) return;
    const f = script.properties.filter((i) => {
      if (sectionActive === i.id) {
        return i;
      }
    });
    return f[0];
  }

  const updateItemByKey = (itemId, key, value, is_position = false) => {
    const activeSc = getValueSectionActive();
    const updatedItems = activeSc?.items?.map((item) => {
      if (item.id === itemId) {
        let updatedItem = {};
        if (!is_position) {
          const updatedContent = { ...item.content, [key]: value };
          updatedItem = { ...item, content: updatedContent };
        } else {
          const updatedContent = { ...item.position, [key]: value };
          updatedItem = { ...item, position: updatedContent };
        }

        return updatedItem;
      }
      return item;
    });

    setScript({
      ...script,
      properties: script.properties.map((e) => {
        if (e.id === activeSc.id) {
          return {
            ...activeSc,
            items: updatedItems,
          };
        }
        return e;
      }),
    });
  };

  function addNewElement(propId, elementType) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (propId === i.id) {
          const elementAdd = KEY_TYPES.filter((e) => {
            if (e.type === elementType) {
              e.id = comum.GenerateId(10).toString();
              return e;
            }
          });
          return {
            ...i,
            items: [...i.items, ...elementAdd],
          };
        }
        return i;
      }),
    });
  }

  return (
    <div className="main-create-render">
      <LPMenuRender
        isMobile={isMobile}
        title={script.name}
        handleScript={handleScript}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          overflow: "hidden",
          paddingTop: 40,
        }}
      >
        <div
          style={{
            borderRight: "1px solid var(--gray)",
            height: "100vh",
            width: "25vw",
          }}
        >
          <LPToolRender
            activeId={sectionActive}
            script={script}
            activeSectionValues={activeSectionValues}
            elementActive={elementActive}
            activeElementValues={activeElementValues}
            updateSectionStyles={updateSectionStyles}
            updateItemByKey={updateItemByKey}
            onActiveElement={setElementActive}
            handlerElement={updateProperties}
            deleteElement={deleteElement}
            onActive={setSectionActive}
          />
        </div>
        {/* <Col className="col-not-padding"> */}
        <div style={{ width: "75vw", overflowX: "auto" }}>
          <LPRender
            script={script}
            isMobile={isMobile}
            activeId={sectionActive}
            elementActive={elementActive}
            handlerElement={updateProperties}
            deleteElement={deleteElement}
            onActive={setSectionActive}
            addNewSection={addNewSection}
            onActiveElement={setElementActive}
            addNewElement={addNewElement}
          />
        </div>
        {/* </Col> */}
      </div>
    </div>
  );
}

export default CreateLandingPage;