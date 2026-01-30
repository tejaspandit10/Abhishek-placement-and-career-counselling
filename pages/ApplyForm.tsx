
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationFormData, EducationRow } from '../types';

export const ApplyForm: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<ApplicationFormData>>({
    education: [
      { qualification: '10th', passingYear: '', percentage: '', stream: '', collegeName: '' },
      { qualification: '12th', passingYear: '', percentage: '', stream: '', collegeName: '' },
      { qualification: 'ITI', passingYear: '', percentage: '', stream: '', collegeName: '' },
      { qualification: 'Diploma', passingYear: '', percentage: '', stream: '', collegeName: '' },
      { qualification: 'Graduation', passingYear: '', percentage: '', stream: '', collegeName: '' },
      { qualification: 'Post Graduation', passingYear: '', percentage: '', stream: '', collegeName: '' },
    ],
    preferredSector: [],
    date: new Date().toLocaleDateString('en-GB'),
    hasPreviousExperience: 'no'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index: number, field: keyof EducationRow, value: string) => {
    const newEdu = [...(formData.education || [])];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setFormData(prev => ({ ...prev, education: newEdu }));
  };

  const handleSectorChange = (sector: string) => {
    const current = formData.preferredSector || [];
    if (current.includes(sector)) {
      setFormData(prev => ({ ...prev, preferredSector: current.filter(s => s !== sector) }));
    } else {
      setFormData(prev => ({ ...prev, preferredSector: [...current, sector] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('pending_application', JSON.stringify(formData));
    localStorage.setItem('payment_context', 'candidate');
    navigate('/payment');
  };

  const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none bg-white text-black transition-all";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1";
  const sectionTitleClass = "text-xl font-bold text-[#003366] uppercase";

  const sectors = [
    'Accounting', 'Sales / Marketing', 'Computer / IT', 
    'Banking', 'Office Admin', 'Technician'
  ];

  return (
    <div className="pt-24 max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-[#003366] p-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Registration & Career Goal Questionnaire</h1>
          <p className="text-cyan-200">नोंदणी व करिअर उद्दिष्ट प्रश्नावली</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-12">
          {/* Agent Code Section */}
          <section className="bg-cyan-50 p-6 rounded-xl border border-cyan-100">
             <div className="flex items-center gap-3 mb-4">
               <span className="text-2xl">🏷️</span>
               <h3 className="font-bold text-[#003366]">Agent Referral (Optional)</h3>
             </div>
             <div className="max-w-sm">
                <label className={labelClass}>Agent Code (एजंट कोड)</label>
                <input 
                  name="agentCode" 
                  placeholder="e.g. tejas-pandit1001" 
                  onChange={handleInputChange} 
                  className={`${inputClass} uppercase placeholder:lowercase`} 
                />
                <p className="text-[10px] text-slate-500 mt-1">If you were referred by an APCC Agent, enter their code here.</p>
             </div>
          </section>

          {/* Section 1: Personal Information */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b pb-2">
              <span className="bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
              <h2 className={sectionTitleClass}>PERSONAL INFORMATION (वैयक्तिक माहिती)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>First Name (प्रथम नाव)*</label>
                <input required name="firstName" onChange={handleInputChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Middle Name (मधले नाव)</label>
                <input name="middleName" onChange={handleInputChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name (आडनाव)*</label>
                <input required name="lastName" onChange={handleInputChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Date of Birth (जन्म तारीख)*</label>
                <input required type="date" name="dob" onChange={handleInputChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Mobile Number (मोबाईल नंबर)*</label>
                <input required type="tel" maxLength={10} name="mobile" onChange={handleInputChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email ID (ईमेल आयडी)*</label>
                <input required type="email" name="email" onChange={handleInputChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Aadhaar Number (आधार कार्ड क्रमांक)*</label>
                <input 
                  required 
                  type="text" 
                  maxLength={12} 
                  name="aadhaar" 
                  placeholder="12-digit Aadhaar Number" 
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 12) {
                      handleInputChange({ target: { name: 'aadhaar', value } } as any);
                    }
                  }} 
                  className={inputClass} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Address (पत्ता)*</label>
                <textarea required name="address" rows={3} onChange={handleInputChange} className={inputClass}></textarea>
              </div>
              <div>
                <label className={labelClass}>Gender (लिंग)*</label>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" required name="gender" value="male" onChange={handleInputChange} className="w-4 h-4 text-cyan-600" />
                    <span>पुरुष (Male)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="female" onChange={handleInputChange} className="w-4 h-4 text-cyan-600" />
                    <span>स्त्री (Female)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="other" onChange={handleInputChange} className="w-4 h-4 text-cyan-600" />
                    <span>इतर (Other)</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Educational Details */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b pb-2">
              <span className="bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
              <h2 className={sectionTitleClass}>EDUCATIONAL DETAILS (शैक्षणिक माहिती)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-3 text-left border text-[#003366] font-bold">Qualification</th>
                    <th className="p-3 text-left border text-[#003366] font-bold">Passing Year</th>
                    <th className="p-3 text-left border text-[#003366] font-bold">% / CGPA</th>
                    <th className="p-3 text-left border text-[#003366] font-bold">Stream</th>
                    <th className="p-3 text-left border text-[#003366] font-bold">College Name</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.education?.map((row, idx) => (
                    <tr key={idx} className="bg-white">
                      <td className="p-2 border font-medium bg-slate-50 text-black">{row.qualification}</td>
                      <td className="p-2 border"><input type="text" className="w-full p-1 bg-transparent outline-none text-black" value={row.passingYear} onChange={(e) => handleEducationChange(idx, 'passingYear', e.target.value)} /></td>
                      <td className="p-2 border"><input type="text" className="w-full p-1 bg-transparent outline-none text-black" value={row.percentage} onChange={(e) => handleEducationChange(idx, 'percentage', e.target.value)} /></td>
                      <td className="p-2 border"><input type="text" className="w-full p-1 bg-transparent outline-none text-black" value={row.stream} onChange={(e) => handleEducationChange(idx, 'stream', e.target.value)} /></td>
                      <td className="p-2 border"><input type="text" className="w-full p-1 bg-transparent outline-none text-black" value={row.collegeName} onChange={(e) => handleEducationChange(idx, 'collegeName', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Career Information */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b pb-2">
              <span className="bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
              <h2 className={sectionTitleClass}>CAREER INFORMATION (करिअर संबंधित माहिती)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelClass}>Preferred Job Sector (कोणत्या क्षेत्रात नोकरी हवी आहे?)*</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {sectors.map(sector => (
                    <label key={sector} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1 rounded">
                      <input 
                        type="checkbox" 
                        checked={formData.preferredSector?.includes(sector)} 
                        onChange={() => handleSectorChange(sector)} 
                        className="w-4 h-4 rounded text-cyan-600"
                      />
                      {sector}
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <input 
                    name="otherSector" 
                    placeholder="Other (Specify) / इतर (नमूद करा)" 
                    onChange={handleInputChange} 
                    className={`${inputClass} text-sm py-2`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Preferred Job Type (नोकरीचा प्रकार)*</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {['Full Time', 'Part Time', 'Internship', 'Work From Home'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        required
                        name="preferredJobType" 
                        value={type} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 text-cyan-600" 
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <label className={labelClass}>Career Goal (आपले करिअर गोल काय आहेत?)*</label>
                <textarea required name="careerGoal" rows={3} onChange={handleInputChange} className={inputClass} placeholder="Describe your future aspirations..."></textarea>
              </div>
              <div>
                <label className={labelClass}>Skills / Experience (कौशल्य / अनुभव)*</label>
                <textarea required name="skills" rows={3} onChange={handleInputChange} className={inputClass} placeholder="Mention technical skills or work experience..."></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <label className={labelClass}>English Proficiency (इंग्रजी ज्ञान)*</label>
                <select required name="englishProficiency" onChange={handleInputChange} className={inputClass}>
                  <option value="">Select Option</option>
                  <option value="yes">Yes (हो)</option>
                  <option value="no">No (नाही)</option>
                  <option value="basic">Basic (प्राथमिक)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Expected Monthly Salary (अपेक्षित मासिक पगार)*</label>
                <input required type="number" name="expectedSalary" onChange={handleInputChange} className={inputClass} placeholder="e.g. 25000" />
              </div>
              <div>
                <label className={labelClass}>Preferred Job Location (नोकरीचे ठिकाण)*</label>
                <input required type="text" name="preferredLocation" onChange={handleInputChange} className={inputClass} placeholder="e.g. Pune, Mumbai" />
              </div>
            </div>

            <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <label className={`${labelClass} mb-4`}>Previous Work Experience (आधी काम केले आहे का?)*</label>
              <div className="flex gap-8 mb-6">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="radio" required name="hasPreviousExperience" value="yes" onChange={(e) => setFormData(prev => ({...prev, hasPreviousExperience: 'yes'}))} className="w-5 h-5 text-cyan-600" />
                  हो (Yes)
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="radio" name="hasPreviousExperience" value="no" defaultChecked onChange={(e) => setFormData(prev => ({...prev, hasPreviousExperience: 'no'}))} className="w-5 h-5 text-cyan-600" />
                  नाही (No)
                </label>
              </div>

              {formData.hasPreviousExperience === 'yes' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input name="prevCompany" onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Designation</label>
                    <input name="prevDesignation" onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Duration (Months/Years)</label>
                    <input name="prevDuration" onChange={handleInputChange} className={inputClass} />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <label className={labelClass}>Additional Information / Special Request (इतर माहिती / विशेष मागणी)</label>
              <textarea name="additionalInfo" rows={2} onChange={handleInputChange} className={inputClass}></textarea>
            </div>
          </section>

          {/* Section 4: Declaration */}
          <section className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#003366] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
              <h2 className={sectionTitleClass}>DECLARATION (जाहिरनामा)</h2>
            </div>
            
            <p className="text-sm text-slate-600 mb-8 leading-relaxed italic">
              "I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief. I understand that any false information may lead to disqualification from the placement process."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelClass}>Applicant Signature (Full Name / सही)*</label>
                <input required name="signature" onChange={handleInputChange} className={`${inputClass} font-serif italic text-lg`} placeholder="Type your full name as signature" />
              </div>
              <div>
                <label className={labelClass}>Date (तारीख)</label>
                <input disabled value={formData.date} className={`${inputClass} bg-slate-100 font-bold`} />
              </div>
            </div>
          </section>

          <div className="flex flex-col items-center gap-4 pt-8 border-t">
            <p className="text-xs text-slate-500 font-medium">Review all details carefully before proceeding.</p>
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-16 py-5 rounded-xl font-black text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 shadow-cyan-900/20">
              PROCEED
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
