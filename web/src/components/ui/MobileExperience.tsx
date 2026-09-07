import { useEffect, useRef, useState } from "react";
import { navigate, setWorld, useWorld, interact } from "../../world/store";
import { zones } from "../../world/zones";
export function MobileExperience() {
  const s = useWorld();
  const [mobile, setMobile] = useState(matchMedia("(max-width:760px)").matches);
  const [menu, setMenu] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
      setWorld({ menuOpen: false });
    },
    [],
  );
  useEffect(() => {
    setWorld({ menuOpen: menu });
  }, [menu]);
  useEffect(() => {
    const q = matchMedia("(max-width:760px)");
    const update = () => setMobile(q.matches);
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (menu) sheet.current?.focus();
  }, [menu]);
  if (!mobile) return null;
  const go = (id: (typeof zones)[number]["id"]) => {
    setMenu(false);
    setWorld({ mobileEntered: true, mobileMap: false, paused: false });
    navigate(id);
  };
  const explore = () => {
    setMenu(false);
    setWorld({
      mobileEntered: true,
      mobileMap: false,
      panelOpen: false,
      paused: false,
      localExplore: true,
    });
  };
  const enter = () => {
    if (s.mobileEntering) return;
    interact();
    setWorld({ mobileEntering: true });
    enterTimer.current = setTimeout(
      () =>
        setWorld({
          mobileEntered: true,
          mobileEntering: false,
          panelOpen: false,
          localExplore: true,
        }),
      s.reduced ? 0 : 900,
    );
  };
  return (
    <>
      {!s.mobileEntered && (
        <button
          className="intro-menu"
          onClick={() => setMenu(true)}
          aria-expanded={menu}
        >
          MENU
        </button>
      )}
      {!s.mobileEntered && !s.mobileMap && !menu && (
        <div className="mobile-welcome">
          <span>00 / WELCOME</span>
          <h1>
            MUHAMMAD
            <br />
            <em>ZUHAIR ZEB.</em>
          </h1>
          <p>
            WordPress & Web Developer
            <br />
            AI Student · Founder of Sociapi Society
          </p>
          <button onClick={enter} disabled={s.mobileEntering}>
            ENTER WORLD ↗
          </button>
        </div>
      )}
      {s.mobileMap && !s.simpleMode && !s.reduced && (
        <div
          className="mobile-map-markers"
          aria-label="Choose a world destination"
        >
          {zones.map((z) => (
            <button
              key={z.id}
              data-world-marker={z.id}
              aria-current={s.currentZone === z.id ? "location" : undefined}
              onClick={() => go(z.id)}
            >
              {z.number} {z.name.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      {s.mobileEntered && (
        <nav className="mobile-dock" aria-label="Mobile exploration">
          <button
            aria-pressed={s.mobileMap}
            onClick={() => {
              setMenu(false);
              setWorld({
                mobileEntered: true,
                mobileMap: !s.mobileMap,
                panelOpen: false,
                paused: false,
              });
            }}
          >
            MAP
          </button>
          <button onClick={explore}>EXPLORE</button>
          <button aria-expanded={menu} onClick={() => setMenu(!menu)}>
            MENU
          </button>
        </nav>
      )}
      {s.mobileEntered && !menu && !s.mobileMap && (
        <div className="mobile-location-hud">
          {zones.find((z) => z.id === s.currentZone)?.number} /{" "}
          {s.currentZone.toUpperCase()}
          <small>
            {s.localExplore ? "DRAG TO LOOK · TAP TO INTERACT" : "MZZ WORLD"}
          </small>
        </div>
      )}
      {s.mobileEntered &&
        !s.mobileMap &&
        s.currentZone !== "home" &&
        !s.isMoving &&
        !s.mobileDetails && (
          <button
            className="mobile-read-more"
            onClick={() => setWorld({ mobileDetails: true, panelOpen: true })}
          >
            EXPLORE {s.currentZone.toUpperCase()} ↗
          </button>
        )}
      {menu && (
        <>
          <button
            className="mobile-sheet-shade"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          />
          <div
            className="mobile-menu-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Choose destination"
            tabIndex={-1}
            ref={sheet}
            onKeyDown={(e) => {
              if (e.key === "Escape") setMenu(false);
              if (e.key === "Tab") {
                const buttons = sheet.current?.querySelectorAll("button");
                if (buttons) {
                  const first = buttons[0],
                    last = buttons[buttons.length - 1];
                  if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                  } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                  }
                }
              }
            }}
          >
            <header>
              <h2>WHERE TO?</h2>
              <button
                onClick={() => setMenu(false)}
                aria-label="Close destination menu"
              >
                ×
              </button>
            </header>
            {zones.map((z) => (
              <button
                key={z.id}
                aria-current={s.currentZone === z.id ? "location" : undefined}
                onClick={() => go(z.id)}
              >
                <span>{z.number}</span>
                {z.name.toUpperCase()}
                <i>↗</i>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
