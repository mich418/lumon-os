const keyframes: { [name: string]: HTMLStyleElement } = {};

type KeyframesDefinition = {
  [progress: string]: {[property: string]: string}
}

export default function createKeyframesStyle(name: string, keyframesDefinition: KeyframesDefinition) {
  if (!keyframes[name]) {
    keyframes[name] = document.createElement('style');
    document.head.appendChild(keyframes[name]);
  }

  let keyframesStyle = `@keyframes ${name} {`;

  for (const progress in keyframesDefinition) {
    keyframesStyle += `${progress} {`;

    for (const property in keyframesDefinition[progress]) {
      keyframesStyle += `${property}: ${keyframesDefinition[progress][property]};`;
    }

    keyframesStyle += '}';
  }

  keyframesStyle += '}';
  keyframes[name].textContent = keyframesStyle;
}