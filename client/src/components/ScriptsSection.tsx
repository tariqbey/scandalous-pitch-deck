import { useEffect, useRef, useState } from "react";

type EpKey = "ep1" | "ep2" | "ep3" | "ep4" | "ep5" | "ep6" | "ep7" | "ep8" | "ep9" | "ep10";

const EPISODES: { key: EpKey; label: string; title: string }[] = [
  { key: "ep1",  label: "Ep 1",  title: "MEET DARIUS" },
  { key: "ep2",  label: "Ep 2",  title: "THE PHOTO" },
  { key: "ep3",  label: "Ep 3",  title: "THE BATHROOM CALL" },
  { key: "ep4",  label: "Ep 4",  title: "TWENTY YEARS" },
  { key: "ep5",  label: "Ep 5",  title: "YOUR SON" },
  { key: "ep6",  label: "Ep 6",  title: "THROW HIM OFF" },
  { key: "ep7",  label: "Ep 7",  title: "ACT NORMAL" },
  { key: "ep8",  label: "Ep 8",  title: "THE GOODBYE" },
  { key: "ep9",  label: "Ep 9",  title: "THE COVER STORY" },
  { key: "ep10", label: "Ep 10", title: "SECOND CALL" },
];

const scriptStyle: React.CSSProperties = {
  background: "#fff",
  padding: "clamp(1rem, 4vw, 3rem) clamp(1rem, 5vw, 3.5rem)",
  borderRadius: "2px",
  border: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
  lineHeight: "1.8",
  color: "#111",
  wordBreak: "break-word",
  overflowWrap: "break-word",
  overflowX: "hidden",
  maxWidth: "100%",
};

const titleBlockStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "3rem",
  fontWeight: "bold",
};

function TitleBlock({ title }: { title: string }) {
  return (
    <div style={titleBlockStyle}>
      <div>SCANDALOUS: BLOODLINE LIES</div>
      <div>"{title}"</div>
      <div style={{ fontWeight: "normal" }}>written by</div>
      <div>Del Rivers</div>
      <div>Upscale Promotions & Entertainment, Inc.</div>
    </div>
  );
}

function Ep1() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="MEET DARIUS" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S LIVING ROOM — EVENING</span>
      <span className="sp-action">Michael opens the front door. JADA stands with DARIUS.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">Dad… this is Darius.</span>
      <span className="sp-action">Darius extends his hand.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Mr. Reed. Good to finally meet you, sir.</span>
      <span className="sp-action">Michael shakes his hand firmly.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">So you the young man my daughter been hiding from me?</span>
      <span className="sp-action">Jada rolls her eyes.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">I wasn't hiding him.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Almost a year, right?</span>
      <span className="sp-action">Jada freezes. Darius smiles nervously. They sit.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Almost a year is a long time.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Yes, sir. I know.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Why am I just now meeting you?</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Because I told Jada I didn't want to meet you until I knew I was serious.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">And you serious?</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Yes, sir.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">You always this respectful, or this just first-meeting behavior?</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">My dad raised me not to play with another man's daughter.</span>
      <span className="sp-action">Michael nods, impressed despite himself.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Your dad sounds solid.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">He is.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">See? He's not bad.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">I didn't say he was bad.</span>
      <span className="sp-beat">Beat.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">I'm still deciding what he is.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 1</span>
    </div>
  );
}

function Ep2() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="THE PHOTO" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S LIVING ROOM — CONTINUOUS</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Your family from around here?</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Yes, sir. Born and raised.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Your father in your life?</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Every day. That's my guy.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Good. A man needs that.</span>
      <span className="sp-action">Darius pulls out his phone.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Matter fact, that's him right there. My dad Calvin. And my mom.</span>
      <span className="sp-action">He turns the phone toward Michael. INSERT PHONE PHOTO: Darius with Calvin and Renee.</span>
      <span className="sp-action">Michael sees Renee. His face almost breaks.</span>
      <span className="sp-action">FLASH CUTS: Young Renee laughing in a motel room. Michael taking off his wedding ring. Renee holding a pregnancy test. Michael saying "We need a DNA test." Renee saying "I'm not blowing up my marriage." Phone screen: BLOCKED.</span>
      <span className="sp-action">Back to Michael. He is frozen too long.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">Dad?</span>
      <span className="sp-action">Michael blinks. He hands the phone back.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Beautiful family.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Appreciate that. That's everything to me.</span>
      <span className="sp-action">Michael looks at Jada's hand resting near Darius's. Under his breath:</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">No…</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 2</span>
    </div>
  );
}

function Ep3() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="THE BATHROOM CALL" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S LIVING ROOM / BATHROOM — CONTINUOUS</span>
      <span className="sp-action">Michael stands abruptly.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Excuse me one second.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">Dad, you okay?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Yeah. I'm good.</span>
      <span className="sp-action">He walks down the hall. Bathroom door closes. His face drops.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-paren">(to himself)</span>
      <span className="sp-dialog">Fuck.</span>
      <span className="sp-action">Michael pulls out his phone. Scrolls through old contacts. Stops on: RENEE COLE. His thumb hovers. From the living room, muffled laughter — Jada and Darius still there. Michael presses call. Phone rings.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Hello?</span>
      <span className="sp-action">Michael freezes.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Hello? Who is this?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Renee.</span>
      <span className="sp-beat">Beat.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Who the hell is this?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">It's Michael.</span>
      <span className="sp-action">Silence. Renee's voice turns cold.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Michael Reed?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Yeah.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Why the fuck are you calling me?</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 3</span>
    </div>
  );
}

function Ep4() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="TWENTY YEARS" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S BATHROOM / RENEE'S KITCHEN — CONTINUOUS</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Why the fuck are you calling me?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Because we need to talk.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">No, we don't. Whatever you got going on, leave me out of it.</span>
      <span className="sp-action">Michael hears Jada laugh in the living room. He looks at the bathroom door.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">You remember the last time I saw you?</span>
      <span className="sp-action">Renee goes quiet.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">You told me you was pregnant.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Don't do this.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">I asked you for a DNA test.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">And I said no.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Because you didn't wanna fuck up your marriage.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">And you didn't wanna fuck up yours. Don't act like I was the only coward.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">I know what we did.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Then why bring it up now?</span>
      <span className="sp-action">Michael looks toward the living room. Darius's voice is faint.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-paren">(from living room)</span>
      <span className="sp-dialog">Yes, ma'am, I respect Jada. Always.</span>
      <span className="sp-action">Michael closes his eyes.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Because your past is sitting in my living room.</span>
      <span className="sp-action">Renee freezes.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 4</span>
    </div>
  );
}

function Ep5() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="YOUR SON" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S BATHROOM / RENEE'S KITCHEN — CONTINUOUS</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">What the hell does that mean?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">My daughter brought a boy home tonight.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">What boy?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">A boy she's been dating almost a year.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">And what does that have to do with me?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">He was respectful. Cool kid. Talking about his dad Calvin.</span>
      <span className="sp-action">Renee's face shifts slightly.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">What did you say?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">He pulled out his phone. Showed me a picture of his family.</span>
      <span className="sp-beat">Beat.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">His dad Calvin.</span>
      <span className="sp-beat">Beat.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">His mother.</span>
      <span className="sp-action">Renee stops breathing.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">What's his name?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Darius.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-paren">(whisper)</span>
      <span className="sp-dialog">Oh my God.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Yeah.</span>
      <span className="sp-action">Michael's voice cracks into anger.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">So now I need to know if that's my son before my daughter ends up with her brother.</span>
      <span className="sp-action">Renee covers her mouth.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 5</span>
    </div>
  );
}

function Ep6() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="THROW HIM OFF" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. RENEE'S KITCHEN — CONTINUOUS</span>
      <span className="sp-action">NOTE: Darius is still at Michael's house. He does not appear here.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Don't you ever say my son and your daughter like that again.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Then tell me he ain't mine.</span>
      <span className="sp-action">Silence. That silence says too much. Calvin enters the kitchen.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Babe?</span>
      <span className="sp-action">Renee jumps.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Who you talking to?</span>
      <span className="sp-action">Renee covers the phone.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Nobody. Just school stuff.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">School stuff got you pale?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-paren">(through phone)</span>
      <span className="sp-dialog">Is that Calvin?</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-paren">(whispering)</span>
      <span className="sp-dialog">Shut up.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Why you whispering?</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Because you walked in asking questions while I'm on the phone.</span>
      <span className="sp-action">Calvin backs off slightly.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Damn, I just asked.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">I'm sorry. It's this fundraiser mess. I'm irritated.</span>
      <span className="sp-action">Renee turns away and whispers into the phone:</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Do not call me again tonight.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">We're not done.</span>
      <span className="sp-action">She hangs up. Calvin watches her.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Fundraiser got you shaking?</span>
      <span className="sp-action">Renee forces a smile.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 6</span>
    </div>
  );
}

function Ep7() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="ACT NORMAL" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S BATHROOM / LIVING ROOM — CONTINUOUS</span>
      <span className="sp-action">Michael stares at his phone after Renee hangs up. A knock at the bathroom door.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">Dad?</span>
      <span className="sp-action">Michael splashes water on his face.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Yeah?</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">You been in there a minute.</span>
      <span className="sp-action">Michael opens the bathroom door. Jada stands there.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">You sick or something?</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Just needed a second.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">You're acting weird.</span>
      <span className="sp-action">Michael walks past her. Back in the living room, Darius stands respectfully.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Sir, I didn't mean to overstay.</span>
      <span className="sp-action">Michael looks at him. The possible son. The daughter's boyfriend. The innocent kid.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">You didn't.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">I appreciate you letting me come by.</span>
      <span className="sp-action">Michael almost cannot speak. Darius offers his hand. Michael shakes it.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">My dad always told me, look a man in the eye when you shake his hand.</span>
      <span className="sp-action">Michael's grip tightens without meaning to. Darius winces slightly. Jada notices.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">Dad.</span>
      <span className="sp-action">Michael lets go.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 7</span>
    </div>
  );
}

function Ep8() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="THE GOODBYE" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S FRONT DOOR / LIVING ROOM — CONTINUOUS</span>
      <span className="sp-action">Jada walks Darius to the door. Michael watches from the living room.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">Thank you again, Mr. Reed.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Mm-hmm.</span>
      <span className="sp-action">Jada shoots Michael a look. At the door, Darius lowers his voice to Jada.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">You good?</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">Yeah. My dad's just… intense.</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">I can handle intense.</span>
      <span className="sp-action">Jada smiles. Michael watches their intimacy. Darius kisses Jada on the forehead. Then whispers:</span>
      <span className="sp-char">DARIUS</span>
      <span className="sp-dialog">I love you.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">I love you too.</span>
      <span className="sp-action">Michael hears it. His face tightens. The door closes. Jada turns and sees Michael staring.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">What?</span>
      <span className="sp-action">Michael says nothing.</span>
      <span className="sp-char">JADA</span>
      <span className="sp-dialog">Dad, what is your problem with him?</span>
      <span className="sp-action">Michael cannot answer.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 8</span>
    </div>
  );
}

function Ep9() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="THE COVER STORY" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. RENEE'S KITCHEN — NIGHT</span>
      <span className="sp-action">Calvin is still watching Renee.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">You never did say who called.</span>
      <span className="sp-action">Renee pours water, buying time.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">I told you. Fundraiser mess.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">From who?</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Tanya.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Who's Tanya?</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Tonya. From the parents' committee.</span>
      <span className="sp-action">Calvin clocks the correction.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">You said Tanya first.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Calvin, please. I'm tired.</span>
      <span className="sp-action">Calvin softens but remains suspicious.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">You know you can tell me if something's wrong.</span>
      <span className="sp-action">That almost breaks her.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">I know.</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Is Darius okay?</span>
      <span className="sp-action">Renee flinches.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Why would you ask that?</span>
      <span className="sp-char">CALVIN</span>
      <span className="sp-dialog">Because you just looked scared when I said his name.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">You reading too much into nothing.</span>
      <span className="sp-action">Calvin looks at her phone on the counter.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 9</span>
    </div>
  );
}

function Ep10() {
  return (
    <div style={scriptStyle}>
      <TitleBlock title="SECOND CALL" />
      <span className="sp-action">FADE IN:</span>
      <span className="sp-slug">INT. MICHAEL'S CAR / RENEE'S BEDROOM HALLWAY — NIGHT</span>
      <span className="sp-action">Michael sits in his car after Darius leaves. He calls Renee again. Renee answers whispering from a hallway.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">I told you not tonight.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">You don't get to hang up after that silence.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">I was shocked.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">No. You were scared.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Because you're talking crazy.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Am I?</span>
      <span className="sp-action">Silence.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">Tell me Darius can't be mine.</span>
      <span className="sp-action">Renee says nothing.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Just keep your daughter away from him.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">That's your plan?</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Make her break up with him.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">With no reason?</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-dialog">Be her father. Fathers say no all the time.</span>
      <span className="sp-action">Michael realizes she wants him to carry the damage.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">You want me to break my daughter's heart so Calvin never asks questions.</span>
      <span className="sp-char">RENEE</span>
      <span className="sp-paren">(whisper)</span>
      <span className="sp-dialog">I want you to protect both families.</span>
      <span className="sp-char">MICHAEL</span>
      <span className="sp-dialog">No. You want me to protect the lie.</span>
      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 10</span>
    </div>
  );
}

const SCRIPT_COMPONENTS: Record<EpKey, React.FC> = {
  ep1: Ep1, ep2: Ep2, ep3: Ep3, ep4: Ep4, ep5: Ep5,
  ep6: Ep6, ep7: Ep7, ep8: Ep8, ep9: Ep9, ep10: Ep10,
};

export default function ScriptsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeEp, setActiveEp] = useState<EpKey>("ep1");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const ActiveScript = SCRIPT_COMPONENTS[activeEp];

  return (
    <section id="scripts" ref={ref} className="resp-section" style={{ background: "#050505" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="section-label">Sample Scripts</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "3rem", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease" }}>
          Read the Scripts
        </h2>

        {/* Episode tabs — scrollable row */}
        <div style={{ display: "flex", gap: "0", marginBottom: "2.5rem", borderBottom: "1px solid rgba(212,175,55,0.2)", overflowX: "auto" }}>
          {EPISODES.map((ep) => (
            <button
              key={ep.key}
              onClick={() => setActiveEp(ep.key)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: activeEp === ep.key ? "2px solid #D4AF37" : "2px solid transparent",
                color: activeEp === ep.key ? "#D4AF37" : "rgba(255,255,255,0.4)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.75rem 1rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                marginBottom: "-1px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {ep.label}: {ep.title}
            </button>
          ))}
        </div>

        {/* Script content */}
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
          <ActiveScript />
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
            Full 60-episode script package available upon request.
          </p>
          <button
            className="gold-btn"
            onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
          >
            Request Full Package
          </button>
        </div>
      </div>
    </section>
  );
}
