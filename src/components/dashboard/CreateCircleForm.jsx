import { useState } from 'react'

function CreateCircleForm({ onCancel, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    selectedPlan: '1-5',
    autoUpgrade: true,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    circleName: '',
    circleDescription: ''
  })

  const pricingPlans = [
    { range: '1-5', price: 3, perUser: 0.60 },
    { range: '6-15', price: 8, perUser: 0.53 },
    { range: '16-30', price: 15, perUser: 0.50 },
    { range: '30-50', price: 20, perUser: 0.40 },
    { range: '50-100', price: 30, perUser: 0.30 },
    { range: '100-500', price: 50, perUser: 0.10 },
    { range: '500-1000', price: 90, perUser: 0.09 }
  ]

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onCancel()
    }
  }

  const handleCreateCircle = (e) => {
    e.preventDefault()
    // TODO: API call to create circle
    onSuccess(formData)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-semibold text-gray-900">Create New Circle</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition text-sm"
          >
            Cancel
          </button>
        </div>
        <p className="text-sm text-gray-600">Step {currentStep} of 2</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
          <div
            className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleCreateCircle}>
        {/* Step 1: Circle Details */}
        {currentStep === 1 && (
          <div className="p-6 space-y-4">
            <input
              type="text"
              required
              value={formData.circleName}
              onChange={(e) => setFormData({ ...formData, circleName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              placeholder="Circle Name (e.g., Marketing Team)"
            />

            <textarea
              value={formData.circleDescription}
              onChange={(e) => setFormData({ ...formData, circleDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              rows="2"
              placeholder="Description (optional)"
            />
          </div>
        )}

        {/* Step 2: Billing */}
        {currentStep === 2 && (
          <div className="p-6 space-y-4">
            {/* Plan Selector */}
            <div className="relative">
              <select
                value={formData.selectedPlan}
                onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
                className="w-full px-3 py-3 border-2 border-teal-200 bg-teal-50 text-teal-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600 text-sm font-medium appearance-none cursor-pointer"
              >
                {pricingPlans.map((plan) => (
                  <option key={plan.range} value={plan.range}>
                    {plan.range} members - ${plan.price}/mo (${plan.perUser.toFixed(2)}/user)
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-teal-900">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <label htmlFor="autoUpgrade" className="text-sm text-gray-700">
                Auto-upgrade as circle grows
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, autoUpgrade: !formData.autoUpgrade })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.autoUpgrade ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.autoUpgrade ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="Card Number"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="CVV"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  required
                  value={formData.billingAddress}
                  onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="Billing Address"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded-lg font-medium transition text-sm text-gray-700 hover:bg-gray-100"
          >
            ← Back
          </button>

          {currentStep < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
            >
              Create Circle
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateCircleForm
