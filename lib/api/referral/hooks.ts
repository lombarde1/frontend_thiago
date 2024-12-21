"use client";

import { useState, useEffect } from 'react';
import { validateReferralCode } from './service';
import type { ReferralValidation } from './types';

export function useReferralValidation(code: string | null) {
  const [validation, setValidation] = useState<ReferralValidation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function validate() {
      if (!code) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await validateReferralCode(code);
        setValidation(result);
      } catch (err) {
        setError('Erro ao validar código de indicação');
        console.error('Error validating referral code:', err);
      } finally {
        setLoading(false);
      }
    }

    validate();
  }, [code]);

  return { validation, loading, error };
}