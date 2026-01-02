import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle, AlertCircle, Loader2, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  checkTemplatePurchase,
  downloadTemplate,
  getUserTemplatePurchases,
  type DownloadFile,
} from '@/lib/templateDownload';
import { TemplateItem } from '@/lib/supabase';
import { useUserAuth } from '@/context/UserAuthContext';

interface TemplateDownloadProps {
  template: TemplateItem;
  customerEmail?: string;
  className?: string;
}

const TemplateDownload: React.FC<TemplateDownloadProps> = ({
  template,
  customerEmail,
  className = '',
}) => {
  const { user } = useUserAuth();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [hasPurchase, setHasPurchase] = useState(false);
  const [purchaseId, setPurchaseId] = useState<number | null>(null);
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [downloadLimit, setDownloadLimit] = useState<number | null>(null);

  const email = customerEmail || user?.email || '';

  useEffect(() => {
    if (email && template.id) {
      checkPurchaseStatus();
    }
  }, [email, template.id]);

  const checkPurchaseStatus = async () => {
    if (!email) return;

    setIsChecking(true);
    try {
      const result = await checkTemplatePurchase(template.id, email);
      setHasPurchase(result.hasPurchase);
      setPurchaseId(result.purchaseId || null);

      if (result.hasPurchase && result.purchaseId) {
        // Get download count info
        const purchases = await getUserTemplatePurchases(email, template.id);
        if (purchases.length > 0) {
          const purchase = purchases[0];
          setDownloadCount(purchase.download_count);
          setDownloadLimit(purchase.download_limit);
        }
      }
    } catch (error) {
      console.error('Failed to check purchase status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleDownload = async () => {
    if (!hasPurchase || !purchaseId || !email) {
      toast({
        title: 'Purchase Required',
        description: 'You need to purchase this template before downloading.',
        variant: 'destructive',
      });
      return;
    }

    // Check download limit
    if (downloadLimit !== null && downloadCount !== null && downloadCount >= downloadLimit) {
      toast({
        title: 'Download Limit Reached',
        description: `You have reached the download limit of ${downloadLimit} for this template.`,
        variant: 'destructive',
      });
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      await downloadTemplate(template.id, purchaseId, email, (progress) => {
        setDownloadProgress(progress);
      });

      toast({
        title: 'Download Started',
        description: `${template.title} is being downloaded as a ZIP file.`,
      });

      // Refresh download count
      await checkPurchaseStatus();
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: 'Download Failed',
        description:
          error instanceof Error ? error.message : 'Failed to download template. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  if (isChecking) {
    return (
      <Button disabled className={className}>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Checking...
      </Button>
    );
  }

  if (!hasPurchase) {
    return (
      <Button
        variant="outline"
        className={`${className} border-gray-700 text-gray-400 cursor-not-allowed`}
        disabled
      >
        <Lock className="h-4 w-4 mr-2" />
        Purchase to Download
      </Button>
    );
  }

  if (downloadLimit !== null && downloadCount !== null && downloadCount >= downloadLimit) {
    return (
      <Button
        variant="outline"
        className={`${className} border-red-500 text-red-400 cursor-not-allowed`}
        disabled
      >
        <AlertCircle className="h-4 w-4 mr-2" />
        Download Limit Reached
      </Button>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Button
        onClick={handleDownload}
        disabled={isDownloading || !template.download_enabled}
        className="w-full bg-dexRed hover:bg-dexRed/90"
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Downloading... {downloadProgress}%
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </>
        )}
      </Button>

      {isDownloading && (
        <div className="space-y-1">
          <Progress value={downloadProgress} className="w-full" />
          <p className="text-xs text-gray-400 text-center">
            Preparing ZIP file... {downloadProgress}%
          </p>
        </div>
      )}

      {downloadCount !== null && downloadCount > 0 && (
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <CheckCircle className="h-3 w-3" />
          <span>Downloaded {downloadCount} time{downloadCount !== 1 ? 's' : ''}</span>
          {downloadLimit !== null && (
            <span className="text-gray-500">
              ({downloadCount}/{downloadLimit} limit)
            </span>
          )}
        </div>
      )}

      {!template.download_enabled && (
        <p className="text-xs text-yellow-400 text-center">
          Downloads are currently disabled for this template
        </p>
      )}
    </div>
  );
};

export default TemplateDownload;

