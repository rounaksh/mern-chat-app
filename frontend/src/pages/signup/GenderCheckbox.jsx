
const GenderCheckbox = ({ onCheckBoxChange, selectedGender }) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label htmlFor="male" className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? 'selected' : ''}`}>
                    <span className='label-text'>Male</span>
                    <input type="checkbox" className='checkbox border-slate-900 bg-[#1d232a]' checked={selectedGender === 'male'} onChange={() => onCheckBoxChange('male')} />
                </label>
            </div>
            <div className='form-control'>
                <label htmlFor="female" className={`label gap-2 cursor-pointer ${selectedGender === 'female' ? 'selected' : ''}`}>
                    <span className='label-text'>Female</span>
                    <input type="checkbox" className='checkbox border-slate-900 bg-[#1d232a]' checked={selectedGender === 'female'} onChange={() => onCheckBoxChange('female')} />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox