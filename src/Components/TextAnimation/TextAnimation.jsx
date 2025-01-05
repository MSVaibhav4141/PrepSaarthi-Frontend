import { TypeAnimation } from 'react-type-animation';

function TextAnimation() {
  return (
    <div>
      <TypeAnimation
        sequence={[
          'to unlock your potential.',
          1500,
          'Connect with mentors for your goals.',
          1500,
          'Forge your future, your way.',
          1500,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '0.8em', display: 'inline-block', color: '#3A5AFF' }}

        repeat={Infinity}
      />
    </div>
  );
}

export default TextAnimation;
