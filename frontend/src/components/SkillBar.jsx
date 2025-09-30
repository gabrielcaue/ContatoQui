const SkillBar = ({ name, level, category }) => {
  const percentage = (level / 5) * 100;
  const levelText = ['Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Expert'][level - 1];

  return (
    <div className="skill-bar" role="listitem">
      <div className="skill-info">
        <span className="skill-name" id={`skill-${name.replace(/\s+/g, '-').toLowerCase()}`}>
          {name}
        </span>
        <span className="skill-percentage" aria-label={`${percentage}% - Nível ${levelText}`}>
          {percentage}%
        </span>
      </div>
      <div 
        className="progress-bar" 
        role="progressbar" 
        aria-valuenow={level}
        aria-valuemin="1"
        aria-valuemax="5"
        aria-valuetext={`${levelText} - ${percentage}%`}
        aria-labelledby={`skill-${name.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div 
          className={`progress-fill ${category}`}
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
